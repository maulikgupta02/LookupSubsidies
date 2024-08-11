from langchain_ollama.llms import OllamaLLM
import pandas as pd
import json
import pandas as pd
import faiss
import numpy as np
from langchain_ollama import OllamaEmbeddings


def split_description(subs):
    """
    LLM to split the subsidy information into a subsidy summary and eligibility criteria
    """

    message=f"""d
    You are provided with a description of a government subsidy scheme : {subs}\
    Return a list with two elements, first one as the summary of the scheme, and second as the eligibility criteria\
    Give a concise eligibility cirteria.
    """
    model = OllamaLLM(model="llama3") 
    response=model.invoke(message).split("**")
    summary=response[2].strip(" \n*")
    criteria=response[4].strip(" \n*")

    return summary,criteria


def get_eligible_scheme_names(user_details):
    """
    LLM to get the names of all the eligible subsidy schemes from the government database

    **output: list of all the scheme names

    **args: user_details in a dictionary format

    """

    # user_details={
    # 'gender':'female',
    # 'scheme_type':['Women'],
    # 'state':'Karnataka',
    # 'occupation':'mse',
    # }

    filter=["All"]
    if user_details["gender"]=="Female":
        filter.append("Women")
    if user_details["caste"]=="SC/ST":
        filter.append("SC/ST")

    subsidies=pd.read_csv("./processed_subsidies.csv")
    subsidies=subsidies[(subsidies["Scheme Type"].isin(filter)) & (subsidies["Applicability Central/State"].isin(["Central",user_details["state"]]))]
    subsidies_str=subsidies[["Subsidy scheme","eligibility_criteria"]].to_csv(index=False)

    selected_user_details={key: user_details[key] for key in ["gender", "state", "occupation","age"]}

    user_details_str = json.dumps(selected_user_details, indent=4)

    llm_prompt_template = f"""You are an advisor who checks if the the user is eligible for any subsidy schemes listed below or not. \
    Government subsidy programs: {subsidies_str} \
    User details: {user_details_str}\
    If there is no eligible subsidy, simply answer 'not elibible for any scheme'. \
    Else return only the scheme names of all the eligible programs, without any explaination. \
    List down the names of all the eligible schemes with * as marker for each scheme.\
    Make sure to not assume any thing, and answer concisely.\
    Answer concisely, with only the data provided. Do not add any additional information.\
    """

    model = OllamaLLM(model="llama3") 

    response=model.invoke(llm_prompt_template).strip("'")

    eligible_schemes=response.split("*")[1:]
    for i in range(len(eligible_schemes)):
        eligible_schemes[i]=eligible_schemes[i].strip(" \n\'\"")

    return eligible_schemes




def chat_bot_subsidies(query):
    """
    QnA LLM for subsidies

    **output: response string as per the user query

    **args: query string

    """

    model = OllamaLLM(model="llama3") 
    embeddings = OllamaEmbeddings(model="llama3")
    index = faiss.read_index('vector_db.index')
    texts = np.load('texts.npy', allow_pickle=True)
    query_vector = embeddings.embed_documents([query])[0]
    query_vector = np.array([query_vector], dtype=np.float32)

    k = 5  # number of nearest neighbors
    D, I = index.search(query_vector, k)  # D: distances, I: indices
    retrieved_texts = [texts[idx] for idx in I[0]]

    llm_prompt_template = f"""You are an assistant who needs to answer to the user queries. \
    Retrieved Context: {retrieved_texts} \
    User questions: {query}\
    Make sure to respond only from the information provided \
    Do not assume any data. \
    If the question is unrelated to the context, simply return "Sorry, I am not able to respond to your query !" only. Do not add any additional details and explaination. \
    Make sure to not add any additional data and notes.
    """

    response=model.invoke(llm_prompt_template)

    return response
from flask import Flask, request, jsonify
from pymongo import MongoClient
from utils import *
from flask_cors import CORS,cross_origin
from bson import ObjectId
import json


client = MongoClient("mongodb+srv://vanshikamahajan1110:5mWeJhjPPthQLMdn@user.qjch970.mongodb.net/")

def get_user_details_db(userid):
    """
    Function to fetch user data from the mongo database

    **args: userid

    **returns: a dictionary with user details

    """

    # Replace 'mydatabase' with the name of your database
    db = client.test

    # Replace 'mycollection' with the name of your collection
    collection = db.users

    query = {"_id": ObjectId(userid)}
    document = collection.find_one(query)
    return document



def verify_user_db(data):
    """
    Login functionality to authenticate user credentials

    **args: dictionary {"phone":phone_number,"password":password}

    **returns: userid if it's a valid user else False
    """

    # Replace 'mydatabase' with the name of your database
    db = client.test

    # Replace 'mycollection' with the name of your collection
    collection = db.users

    query = data
    user = collection.find_one({'phone':query['phone']})
    pas = collection.find_one({'password':query['password']})
    if user and pas and user==pas:
        return user['_id']
    return False



def add_user_db(data):
    """
    Signup functionality to add new users

    **args: user details JSON

    **returns: success or failure
    """
    try:
        # Replace 'mydatabase' with the name of your database
        db = client.test

        # Replace 'mycollection' with the name of your collection
        collection = db.users

        dic={
            'username': data["username"],
            'age': data["age"],
            'gender': data["gender"],
            'caste': data["caste"],
            'income': data["income"],
            'occupation': data["occupation"],
            'state': data["state"],
            'phone': data["phone"],
            'password': data["password"]
        }
        collection.insert_one(dic)

        return "added new user successfully"
    
    except Exception as e:
        return f"dekhle bhai {e}"



def get_eligible_subsidies(user_details):
    schemes=get_eligible_scheme_names(user_details)
    return schemes


def get_query_response(query):
    response=chat_bot_subsidies(query)
    return response



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


#check_policy_eligibility
@app.route('/policy_eligibility', methods=['POST','GET'])
@cross_origin()
def check_eligibility():
    data = request.get_json()  # Get data from React frontend
    print(f"Received data: {data}")
    if not data["user_id"]:
        return "user not logged-in"
    user_details=get_user_details_db(data["user_id"])
    print(user_details)
    response=get_eligible_scheme_names(user_details)
    print(response)

    if len(response)==0:
        return "Not eligibible for any government subsidy schemes"
    
    res=""
    for i in response:
        res+=i+"\n"

    return res # Send processed data back to React


#QnA chatbot
@app.route('/QnAchatbot', methods=['POST','GET'])
@cross_origin()
def chatbot():
    data = request.get_json()  # Get data from React frontend
    print(f"Received data: {data}")
    if not data["question"]:
        return "please ask a query !"

    response=get_query_response(data["question"])
    print(response)
    
    return response # Send processed data back to React


#login
@app.route('/verify_user', methods=['GET','POST'])
@cross_origin()
def verify_user():
    data = request.get_json()  # Get data from React frontend
    print(f"Received data: {data}")

    response=verify_user_db(data)
    print(response)

    if response:
        return str(response)

    return response  # Send processed data back to React


#signup
@app.route('/add_user', methods=['GET','POST'])
@cross_origin()
def add_user():
    data = request.get_json()  # Get data from React frontend
    print(f"Received data: {data}")

    response=add_user_db(data)

    print(response)

    return response  # Send processed data back to React


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True) 
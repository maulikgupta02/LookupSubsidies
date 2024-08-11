import React, { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const Chatarea = () => {
  const messageInputRef = useRef(null);
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);
  const [objectid, setObjectid] = useState('');

  const sendMessage = async () => {
    const question = messageInputRef.current.value.trim();
    if (question) {
      const newConversation = [...conversation, { question, answer: "" }];
      setConversation(newConversation);
      messageInputRef.current.value = "";
      try {
        const response = await axios.post(
          "http://192.168.186.198:5000/QnAchatbot",
          { question: question }
        );
        console.log(response.data);
        if (response.data) {
          setConversation(prevConversation => [
            ...prevConversation.slice(0, -1),
            { ...prevConversation[prevConversation.length - 1], answer: response.data }
          ]);
        } else {
          console.error("Error in response:", response.data);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const sendMessage2 = async () => {
    try {
      const response = await axios.post(
        "http://192.168.186.198:5000/policy_eligibility",
        { user_id: objectid }
      );
      console.log(response);
      if (response.data) {
        setConversation(prevConversation => [
          ...prevConversation,
          { question: "Check my eligibility", answer: response.data }
        ]);
      } else {
        console.error("Error in response:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    const savedString = Cookies.get('objectid');
    setObjectid(savedString);
  }, [conversation]);

  return (
    <div className="m-3 shadow-xl rounded-lg pb-3 pl-3 pr-3 h-[92vh] text-gray-400">
      <h2 className="text-3xl font-bold text-center mb-2">ChatBot</h2>
      <div className="history p-2 h-[71vh] overflow-auto" ref={chatContainerRef}>
        {conversation.map((item, index) => (
          <div key={index} className={`text-black`}>
            <div className={`flex gap-5 bg-blue-800 rounded-xl m-2 mr-[55%] p-2`}>
              <span className="text-lg leading-tight font-semibold text-blue-600">
                Q
              </span>
              <p className="text-lg leading-tight font-semibold break-words whitespace-pre-wrap overflow-x-hidden">
                {item.question}
              </p>
            </div>
            {item.answer && (
              <div className={`flex gap-5 m-2 ml-[35%] p-3 bg-blue-500 rounded-xl`}>
                <span className="text-lg leading-tight font-semibold text-green-600">
                  A
                </span>
                <p className="text-lg leading-tight font-semibold break-words whitespace-pre-wrap overflow-x-hidden">
                  {item.answer}
                </p>
              </div>
            )}
            <br />
          </div>
        ))}
      </div>
      <div className="suggestions flex justify-center items-center p-2">
        <div
          className="text-center bg-[#102b4094] p-2 border-2 rounded-lg w-[15vw] cursor-pointer"
          onClick={sendMessage2}
        >
          Check my eligibility
        </div>
      </div>
      <div className="input flex mt-2 bottom-8 w-[35vw]">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-1 rounded-lg outline-none text-black"
          ref={messageInputRef}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="bg-green-600 rounded-lg ml-2 p-2 text-gray-800"
          onClick={sendMessage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chatarea;

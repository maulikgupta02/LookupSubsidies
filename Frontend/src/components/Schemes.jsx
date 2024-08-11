import React from "react";
import Navbar from "./Navbar";
import Chatarea from "./Chatarea";
import Cards from "./Cards/Cards";
import schemes from "../processed_subsidies.json";
import styles from "./Schemes.module.css";

const Schemes = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[url('https://hyderabadangels.in/wp-content/uploads/2022/01/Top-Government-Schemes-For-Startups-in-India-Banner-1.png')] bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="relative z-10 min-h-screen">
          <div className="flex p-4 h-[90vh]">
            <div className="lside w-[100%] p-4 pt-[10vh]">
              <div className="text-[8vw] leading-[110px] text-white">
                Government Subsidy Schemes
              </div>
              <div className="text-[3vw] text-white">Explore and Engage</div>
              <div className="text-[1.5vw] text-gray-400">
                Welcome to our interactive platform dedicated to helping you
                navigate the world of government subsidy schemes. Discover
                comprehensive details about various subsidy programs designed to
                support individuals and businesses. Our intelligent chatbot is
                here to assist you with all your queries about these schemes.
                Simply ask the chatbot about any scheme, and it will provide you
                with relevant information. Additionally, use the 'Check
                Eligibility' feature to find out which schemes you qualify for,
                making it easier than ever to access the support you need. Start
                exploring today and take advantage of the benefits
                available to you!
              </div>
            </div>
          </div>
          <div className="flex h-[calc(100vh-1.2vh)]">
            <div
              className={`lside  ${styles["custom-scroll"]} w-[60%] pb-5 pl-5 pr-5  overflow-auto`}
            >
              {schemes.map((item, index) => (
                <Cards item={item} key={index} />
              ))}
            </div>
            <div className="rside bg-[#102B40] w-[40%] p-3">
              <Chatarea />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schemes;

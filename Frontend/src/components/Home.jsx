import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />



      <div className="relative min-h-screen bg-[url('https://www.shutterstock.com/image-illustration/blue-money-business-graph-finance-600nw-2166540277.jpg')] bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="relative z-10 min-h-screen">
          <div className="flex p-4 h-[90vh]">
            <div className="lside w-[100%] p-4 pt-[10vh]">
              <div className="text-[5vw] leading-[110px] text-white font-serif">
              "Financial freedom is available to those who learn about it and work for it."
              </div>
              <div className="text-[3vw] text-white font-serif"> - Robert Kiyosaki</div>
            </div>
          </div>
          <div className="flex m-5">
          <div className="w-[50%]  ml-[4vw] mr-[4vw] mt-[5vh] mb-[5vh] shadow-xl p-8 bg-white rounded-md shadow-white">
            <h1 className="text-3xl font-bold">Government Subsidies</h1>
            <p className="mt-2">
            Here, you’ll find a comprehensive list of available government subsidy schemes, meticulously gathered through web scraping from reliable sources to ensure you have access to the most up-to-date information. To assist you further, our chatbot is available to answer any questions you might have and to provide guidance on the various schemes. Additionally, our eligibility checker tool helps you determine which subsidies you qualify for based on your personal profile. We’ve designed this page to make exploring and understanding government subsidies as easy and straightforward as possible.
            </p>
          </div>
          <div className="w-[50%]">
            <img src="home1.webp" alt="" className="rounded-xl" />
          </div>
        </div>
        <div className="flex mt-5 ml-5 mr-5">
          <div className="w-[50%]">
            <img src="home2.webp" alt="" className="rounded-xl" />
          </div>
          <div className="w-[50%]  ml-[4vw] mr-[4vw] mt-[5vh] mb-[5vh] shadow-xl p-8 bg-white rounded-md shadow-white">
            <h1 className="text-3xl font-bold">Investment Advice</h1>
            <p className="mt-2">
            Here, you’ll find expert advisors who provide predictions on whether to buy or hold stocks. We’ve collected data from various reliable sources using web scraping to ensure you receive the most accurate and up-to-date insights. Each advisor is assigned a credibility score, calculated by comparing their past predictions to actual market outcomes. This helps you make informed decisions based on the proven track record of each expert. We’re dedicated to offering you trustworthy and reliable investment advice to guide your financial journey.
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;

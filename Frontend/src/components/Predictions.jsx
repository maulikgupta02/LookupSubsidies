import React from "react";
import Navbar from "./Navbar";
import Predictioncard from "./PredictionCard/Predictioncard";
import data from "../Market_Predictions.json";

const Predictions = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-[90vh]">
        <div className="absolute inset-0 bg-[url('https://www.indiabullsrealestate.com/blog/wp-content/uploads/2019/07/Real-Estate-Investment-Tips-for-Beginners.jpg')] bg-no-repeat bg-cover w-full h-full">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 flex p-4 h-full">
          <div className="lside w-[60%] p-5 pt-[14vh]">
            <div className="text-[8vw] leading-[110px] text-white">
              Stock Visionaries
            </div>
            <div className="text-[3vw] text-white">
            Credibility Scores and Predictions
            </div>
          </div>
          <div className="rside w-[40%] rounded-xl m-11 p-[5vh] shadow-lg bg-white bg-opacity-80">
            <div className="text-[1.2vw] ">
              Welcome to our comprehensive directory of stock prediction experts
              and firms. Here, you'll find detailed profiles of individuals and
              organizations renowned for their stock market forecasts. Each
              profile includes a credibility score, meticulously calculated
              based on the accuracy and timeliness of their past predictions.
              This score helps you gauge the reliability of their
              recommendations, whether it’s a suggestion to buy or hold a stock.
              Explore the list to find trusted advisors and make informed
              investment decisions with confidence.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-4">
        {data.map((item, index) => (
          <Predictioncard item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default Predictions;

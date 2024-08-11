import React, { useState } from "react";
// import styles from "./Cards.module.css";

const Cards = ({ item }) => {
  return (
    <>
      <div className=" bg-[#102B40] text-gray-400 p-6 shadow-lg ml-5 mr-5 mb-5 rounded-lg">
        <div className="scheme-heading text-center font-bold text-[3vh]">
          {item["Subsidy scheme"]}
        </div>
        <div className="ministry text-center font-bold text-[2vh] mb-5">
          {item["Ministry"]}
        </div>
        <div className="flex">
          <div className="w-1/2">
            <div className="scheme-type m-1 p-2">
              <span className="font-bold">Scheme-type: </span>{item["Scheme Type"]}
            </div>
            <div className="m-1 p-2">
              <span className="">
                <span className="font-bold">Summary: </span>{item["summary"]}
              </span>
            </div>
          </div>
          <div className="w-1/2">
            <div className="level text-[2.5vh] m-1 p-2">
              <span className="font-bold">Area: </span>{item["Applicability Central/State"]}
            </div>
            <div className="m-1 p-2">
              <span className="">
                <span className="font-bold">Eligibilty: </span>{item["eligibility_criteria"]}
              </span>
            </div>
          </div>
        </div>
        <div className="know-more text-center mt-5">
          <a
            className="bg-blue-500 text-white pt-[0.5vh] pb-[0.5vh] pl-1.5 pr-1.5 rounded-lg"
            href={item["Visiting link to know more"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Know More
          </a>
        </div>
      </div>
    </>
  );
};

export default Cards;

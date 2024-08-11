import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { objectid, setObjectid } = useAppContext();
  const navigate = useNavigate();

  const clickhandler = async (e) => {
    e.preventDefault();
    console.log(phone, password);
    try {
      const response = await axios.post(
        "http://192.168.186.198:5000/verify_user",
        {
          phone,
          password,
        }
      );
      console.log(phone, password);
      // alert(`Login Successful\nPhone: ${phone}\nPassword: ${password}`);
      console.log("Response:", response.data);
      Cookies.set("objectid", response.data, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });
      // setObjectid(response.data);
      console.log("Objectid:", objectid);
      setObjectid(response.data);

      navigate("/home");
    } catch (error) {
      console.error(
        "Error sending request:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-black text-white p-8 w-1/3 text-center">
        <img
          src="logo2.jpg"
          alt="BlackRock"
          className="mb-4"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-[15vw] w-2/3">
        <h1 className="mb-4 text-[2vw]">Login to an account</h1>
        <form className="flex flex-col w-full">
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300"
          />
          <button
            type="submit"
            onClick={clickhandler}
            className="p-2 bg-black text-white hover:bg-gray-800"
          >
            Log In
          </button>
        </form>
        <div className="font-semibold m-2">
          New User:{" "}
          <button className="text-blue-500"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex pt-[15px] pl-[40px] pr-[40px] gap-9 pb-[15px] border-b-[3px] ">
      <Link to="/">
        <img src="logo2.jpg" alt="BlackRock Logo" className="w-[200px]" />
      </Link>
        <ul className="flex gap-8 text-lg items-center">
          <li>
            <a href="/schemes">Government Subsidies</a>
          </li>
          <li>
            <a href="/predictions">Investment Advice</a>
          </li>
        </ul>
        <button
          onClick={() => {
            navigate("/login");
          }}
          type="button"
          className="border-2 rounded-sm text-lg pl-[15px] pr-[15px] py-1 border-black ml-auto"
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default Navbar;

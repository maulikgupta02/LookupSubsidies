import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    age: "",
    gender: "",
    caste: "",
    income: "",
    occupation: "",
    state: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert age and income to numbers
    const formattedData = {
      ...formData,
      age: Number(formData.age),
      income: Number(formData.income),
    };

    // Log the form data to the console
    console.log("Form Data Submitted:", formattedData);

    try {
      const response = await fetch("http://192.168.186.198:5000/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center bg-black text-white p-6 md:w-1/3 text-center">
        <img
          src="logo2.jpg"
          alt="BlackRock"
          className="mb-4"
        />
        <p className="mb-2">Already have an account?</p>
        <a href="/login" className="text-red-500">
          Log In
        </a>
      </div>
      <div className="flex flex-col justify-center p-[50px] m-5 md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">Create an account</h1>
        <p className="mb-4">All fields required.</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Name"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.age}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <select
              id="gender"
              name="gender"
              required
              className="mb-4 w-1/2 p-2 text-base border border-gray-300 rounded"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select
              id="caste"
              name="caste"
              required
              className="mb-4 p-2 w-1/2 text-base border border-gray-300 rounded"
              value={formData.caste}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Caste
              </option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc_st">SC/ST</option>
            </select>
          </div>
          <input
            type="number"
            id="income"
            name="income"
            placeholder="Income"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.income}
            onChange={handleChange}
          />
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="Occupation"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.occupation}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Set Password"
            required
            className="mb-4 p-2 text-base border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-2 text-base bg-black text-white rounded hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

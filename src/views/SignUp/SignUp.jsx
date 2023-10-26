import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [FormData, setFormData] = useState({
    Userfname: "",
    Userlname: "",
    UserDateOfBirth: "",
    Gender: "",
    Weight: "",
    Height: "",
    UserEmail: "",
    UserPassword: "",
    RePassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    //Check Password and Repassword
    if (FormData.UserPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    if (FormData.UserPassword !== FormData.RePassword) {
      setErrorMessage("Password and Re-Password do not match");
      return;
    }

    try {
      await axios.post(
        "https://keepfit-backend.onrender.com/auth/register",
        FormData
      );
      navigate("/login");

      console.log("Data saved successfully:");
    } catch (error) {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data. Please try again.");
    }
  };

  return (
    <>
      {/* <NavbarLandingPage /> */}
      <div className=" flex min-h-[100vh]">
        {/* section 1 */}
        <div className="left hidden md:block min-h-[100%] w-[100%]"></div>
        {/* section 2 */}
        <div className="right min-h-[100%] bg-white w-[100%]">
          <div className="flex justify-center items-center w-[100%] min-h-[100%]">
            <div className="glass  flex-col flex items-center px-14 pb-14 rounded-xl">
              <h1 className=" text-[70px] text-primary italic font-bold text-center">
                Sign Up
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary font-semibold text-[16px]">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  name="Userfname"
                  value={FormData.Userfname}
                  onChange={handleInputChange}
                  placeholder="Enter Firstname"
                  className="input input-bordered w-80 h-10"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary font-semibold text-[16px]">
                    LastName
                  </span>
                </label>
                <input
                  type="text"
                  name="Userlname"
                  placeholder="Enter Lastname"
                  value={FormData.Userlname}
                  onChange={handleInputChange}
                  className="input input-bordered w-80 h-10"
                />
              </div>
              <div className="flex justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-semibold text-[16px]">
                      Date of Birth
                    </span>
                  </label>
                  <input
                    type="date"
                    name="UserDateOfBirth"
                    placeholder="Enter Lastname"
                    value={FormData.UserDateOfBirth}
                    onChange={handleInputChange}
                    className="input input-bordered w-40 text-secondary mr-4"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-semibold text-[16px]">
                      Gender
                    </span>
                  </label>
                  {/* problem */}
                  <select
                    name="Gender"
                    className="select select-bordered text-gray-400 "
                    onChange={handleInputChange}
                  >
                    <option disabled selected>
                      None
                    </option>
                    <option value={"Female"}>Female</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Not specified"}>Not specified</option>
                  </select>
                </div>
              </div>
              {/* problem */}
              <div className="flex justify-between">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-semibold text-[16px] ">
                      Weight
                    </span>
                  </label>

                  <input
                    type="number"
                    name="Weight"
                    min={0}
                    max={300}
                    placeholder="Enter Weigth"
                    value={FormData.Weight}
                    onChange={handleInputChange}
                    className="input input-bordered w-[9.5rem] text-secondary h-10 mr-4 "
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-semibold text-[16px]">
                      Height
                    </span>
                  </label>
                  <input
                    type="number"
                    name="Height"
                    min={0}
                    max={300}
                    placeholder="Enter Height"
                    value={FormData.Height}
                    onChange={handleInputChange}
                    className="input input-bordered w-[9.5rem] text-secondary h-10"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary font-semibold text-[16px]">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="UserEmail"
                  placeholder="Enter Email"
                  value={FormData.UserEmail}
                  onChange={handleInputChange}
                  className="input input-bordered w-80"
                  required
                />
              </div>
              <div className="form-control pb-4">
                <label className="label">
                  <span className="label-text text-primary font-semibold text-[16px]">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="UserPassword"
                  placeholder="Enter password"
                  value={FormData.UserPassword}
                  onChange={handleInputChange}
                  className="input input-bordered w-80"
                  required
                />
              </div>
              <div className="form-control pb-4">
                <label className="label">
                  <span className="label-text text-primary font-semibold text-[16px]">
                    Re-Password
                  </span>
                </label>
                <input
                  type="password"
                  name="RePassword"
                  value={FormData.RePassword}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="input input-bordered w-80"
                  required
                />
              </div>

              {/* <Link to={"/activity"}> */}
              <button
                onClick={handleSubmit}
                className="btn-primary w-80 rounded-md p-1 text-[24px] font-semibold text-white"
              >
                Sign Up
              </button>
              <div className="flex  pt-3  gap-x-3 items-center pb-3 w-[300px] justify-between">
                <span className="text-primary flex flex-row items-center w-1/2">
                  <AiOutlineArrowLeft /> <a href="/">Explore more</a>
                </span>
                <span className=" justify-end flex flex-row items-center w-1/2">
                  <a href="/login">Login</a>
                  <AiOutlineArrowRight />
                </span>
              </div>

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

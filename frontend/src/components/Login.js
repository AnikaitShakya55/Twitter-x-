import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      setLoader(true);
      // login
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
          setLoader(false);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
        setLoader(false);
      }
    } else {
      // signup
      try {
        setLoader(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password, phoneNo },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
          setLoader(false);
          navigate("/");
        }
      } catch (error) {
        // toast.success(error.response.data.message);
        console.log(error);
        setLoader(false);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-8 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full max-w-5xl">
        {/* Twitter Logo Section */}
        <div className="hidden md:flex">
          <img
            className="w-[250px] md:w-[300px] lg:w-[350px]"
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>

        {/* Authentication Section */}
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 sm:p-10">
          <div className="mb-6 text-center">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-900">
              Happening now.
            </h1>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center mb-4">
            {isLogin ? "Login" : "Signup"}
          </h1>

          <form onSubmit={submitHandler} className="flex flex-col space-y-3">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg font-medium"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg font-medium"
                />
                <input
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(Number(e.target.value))}
                  placeholder="Phone no"
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg font-medium"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg font-medium"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg font-medium"
            />

            <button className="bg-blue-500 hover:bg-blue-600 transition-all py-3 rounded-lg text-lg text-white font-semibold mt-3 flex items-center justify-center">
              {loader ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : isLogin ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-700 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-blue-600 cursor-pointer hover:underline"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

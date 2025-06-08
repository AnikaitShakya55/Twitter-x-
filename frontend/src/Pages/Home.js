import React, { useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  // custom Hook
  useOtherUsers();
  // console.log(user);
  useGetMyTweets();

  return (
    <div className="flex justify-between align-middle  w-[100%] ">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;

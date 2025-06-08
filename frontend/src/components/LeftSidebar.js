import React, { useState } from "react";
import { CiHome, CiHashtag, CiUser, CiBookmark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <AiOutlineClose size="24px" />
        ) : (
          <AiOutlineMenu size="24px" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:relative h-[100vh] bg-white transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 
          w-[100%] sm:w-[40%] md:w-[30%] lg:w-[25%] flex flex-col items-start border-r`}
      >
        <div className="w-full p-4">
          <img
            className="ml-2 sm:ml-5"
            width="32px"
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>

        <div className="my-4 w-full">
          {/* Navigation Links */}
          {[
            { name: "Home", icon: <CiHome size="24px" />, link: "/" },
            {
              name: "Explore",
              icon: <CiHashtag size="24px" />,
              link: "/explore",
            },
            {
              name: "Notifications",
              icon: <IoIosNotificationsOutline size="24px" />,
              link: "/notifications",
            },
            {
              name: "Profile",
              icon: <CiUser size="24px" />,
              link: `/profile/${user?._id}`,
            },
            {
              name: "Bookmarks",
              icon: <CiBookmark size="24px" />,
              link: "/bookmarks",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full w-[90%]"
            >
              {item.icon}
              <span className="ml-2 sm:block hidden font-bold text-lg">
                {item.name}
              </span>
            </Link>
          ))}

          {/* Logout */}
          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full w-[90%] cursor-pointer"
          >
            <AiOutlineLogout size="24px" />
            <span className="ml-2 sm:block hidden font-bold text-lg">
              Logout
            </span>
          </div>

          {/* Post Button */}
          {/* <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
            Post
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;

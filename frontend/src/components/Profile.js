import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import useGetProfile from "../hooks/useGetProfile";
import CircularProgress from "@mui/material/CircularProgress";
import EditProfile from "./Profile/EditProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);

  useGetProfile(id, setLoading);

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow`, {
          id: profile._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // follow

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow`, {
          id: profile._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const editProfileHandler = () => {
    setEditProfilePopUp(true);
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          <CircularProgress size={25} />
        </div>
      )}
      {loading === false && (
        <div className="w-[50%] border-l border-r border-gray-200">
          <div>
            <div className="flex items-center py-2">
              <Link
                to="/"
                className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
              >
                <IoMdArrowBack size="24px" />
              </Link>
              <div className="ml-2">
                <h1 className="font-bold text-lg">{profile?.name}</h1>
                <p className="text-gray-500 text-sm">10 post</p>
              </div>
            </div>
            <img
              src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"
              alt="banner"
            />
            <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
              <Avatar
                src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                size="120"
                round={true}
              />
            </div>
            <div className="text-right m-4">
              {user?._id === id ? (
                <button
                  onClick={editProfileHandler}
                  className="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-300 ease-in-out"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={followAndUnfollowHandler}
                  className="px-4 py-1 bg-black text-white rounded-full"
                >
                  {user.following.includes(id) ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="m-4 mt-10">
              <h1 className="font-bold text-xl mt-2">{profile?.name}</h1>
              <p>{`@${profile?.username}`}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 w-full mx-auto text-gray-800">
              <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                  <p className="text-lg font-semibold">Followers</p>
                  <p className="text-xl font-bold text-blue-600">
                    {profile?.followers.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">Following</p>
                  <p className="text-xl font-bold text-green-600">
                    {profile?.following.length}
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700">
                <p>{profile?.description || "No description provided."}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {editProfilePopUp && (
        <EditProfile onClose={() => setEditProfilePopUp(false)} />
      )}
    </>
  );
};

export default Profile;

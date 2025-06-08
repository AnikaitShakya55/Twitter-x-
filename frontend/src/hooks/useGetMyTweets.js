import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = () => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/getalltweets`, {
        withCredentials: true,
      });
      console.log("dispatch first ");

      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/getFollowingTweet`,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      followingTweetHandler();
    }

    // eslint-disable-next-line
  }, [refresh, isActive]);
};
export default useGetMyTweets;

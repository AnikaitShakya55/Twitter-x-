import React from "react";
import CreatePost from "./CreatePost.js";
import Tweet from "./Tweet.js";
import { useSelector } from "react-redux";

const Feed = () => {
  const { tweets } = useSelector((state) => state.tweet);

  return (
    <div className="w-[100%] sm:w-[80%] md:w-[60%] border border-gray-200">
      <div>
        <CreatePost />
        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;

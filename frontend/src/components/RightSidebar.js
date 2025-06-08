import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  const [searchQuery, setSearchQuery] = useState();

  return (
    <div className="w-full bg-white sm:w-[50%] md:w-[40%] lg:w-[30%] p-4 mt-4 sm:mt-0">
      {/* Search Bar */}
      <div className="flex items-center p-2 bg-gray-200 rounded-full w-full">
        <CiSearch size="20px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2 w-full"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Who to Follow Section */}
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {otherUsers?.length > 0 ? (
          otherUsers
            .filter((user) =>-
              user?.name
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase() || "")
            )
            .map((user) => (
              <div
                key={user?._id}
                className="flex flex-wrap items-center justify-between my-3 gap-2"
              >
                {/* User Info */}
                <div className="flex items-center">
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                    size="40"
                    round={true}
                  />
                  <div className="ml-2 text-left">
                    <h1 className="font-bold text-[clamp(14px, 4vw, 18px)]">
                      {user?.name}
                    </h1>
                    <p className="text-gray-600 text-[clamp(12px, 3.5vw, 16px)]">
                      @{user?.username}
                    </p>
                  </div>
                </div>

                {/* Responsive Button */}
                <Link to={`/profile/${user?._id}`} className="w-auto">
                  <button className="px-3 py-1 sm:px-4 sm:py-2 bg-black text-white rounded-full text-xs sm:text-sm">
                    Profile
                  </button>
                </Link>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500 mt-2">No suggestions available</p>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePostFetch from "../../hooks/usePostFetch";

const EditProfile = ({ onClose }) => {
  const { user, profile } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [description, setDescription] = useState("");
  // calling api's
  const editProfile = usePostFetch();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setUsername(profile.username);
      setDescription(profile.description);
    }
  }, [user, profile]);

  const updateProfileHandler = async () => {
    const obj = { name, userName, description };
    try {
      const res = await editProfile.postData(
        `/user-api/edit_user_profile/${user._id}`,
        obj,
        "PUT"
      );
      console.log("Response:", res);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40vw]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">UserName</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your User Name"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={updateProfileHandler}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

import  { useState } from "react";

const usePostFetch = () => {
  const [postDataLoader, setPostDataLoader] = useState(false);
  const postData = async (url, data, method) => {
    setPostDataLoader(true);
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error during post request:", error);
    } finally {
      setPostDataLoader(false);
    }
  };

  return { postData, postDataLoader };
};

export default usePostFetch;

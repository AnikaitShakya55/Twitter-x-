import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id, setLoading) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/getmyprofile/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log("profile api", res);
          dispatch(getMyProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProfile();
    // eslint-disable-next-line
  }, [id]);
};
export default useGetProfile;

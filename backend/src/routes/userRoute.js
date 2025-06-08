import express from "express";
import {
  Bookmarks,
  follow,
  getMyProfile,
  getOtherUsers,
  Login,
  Logout,
  Register,
  Unfollow,
  editUserProfile,
  profileImageUpload,
  getProfileImage,
  deleteProfileImage,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

// user Routes
router.route("/register").post(Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.route("/bookmarks/:id").put(isAuthenticated, Bookmarks);
router.route("/getmyprofile/:id").get(isAuthenticated, getMyProfile);
router.put("/edit_user_profile/:id", isAuthenticated, editUserProfile);
router.route("/getotherusers").get(isAuthenticated, getOtherUsers);
router.route("/follow").post(isAuthenticated, follow);
router.route("/unfollow").post(isAuthenticated, Unfollow);


// profile Image Routes
router.route("/uploadProfileImage").post(isAuthenticated, profileImageUpload);
router.route("/getProfileImage").get(isAuthenticated, getProfileImage);
router.route("/deleteProfileImage").delete(isAuthenticated, deleteProfileImage);





export default router;

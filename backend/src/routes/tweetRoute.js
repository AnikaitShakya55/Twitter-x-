import express from "express";
import isAuthenticated from "../config/auth.js";
import {
  createTweet,
  deleteTweet,
  GetAllTweets,
  GetfollowingTweet,
  likeOrDislike,
} from "../controllers/tweetController.js";

const router = express.Router();

router.route("/create-tweet").post(isAuthenticated, createTweet);
router.route("/delete-tweet").delete(isAuthenticated, deleteTweet);
router.route("/like-tweet/:id").put(isAuthenticated, likeOrDislike);
router.route("/getalltweets").get(isAuthenticated, GetAllTweets);
router.route("/getFollowingTweet").get(isAuthenticated, GetfollowingTweet);

export default router;

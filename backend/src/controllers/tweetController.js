import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required",
        success: false,
      });
    }

    const loggedInUser = await User.findById(req.user).select("-password");
    await Tweet.create({
      description,
      userId: id,
      userDetails: loggedInUser,
    });
    return res.status(201).json({
      message: "Tweet Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Tweet Deleted Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(401).send({
      message: "Id doesn't exist",
      success: false,
    });
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      // User has liked the tweet, so remove the like
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });

      return res.status(200).json({
        message: "User disliked your tweet",
      });
    } else {
      // User has not liked the tweet, so add the like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });

      return res.status(200).json({
        message: "User liked your tweet",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Something wrong Happened",
      success: false,
    });
  }
};

export const likeOrDislikePractiseSequelize = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userIdWhoLikesTweet = req.body.userId;
    const tweet = await Tweet.findOne({ where: { _id: tweetId } });
    if (tweet.like.includes(loggedInUserId)) {
      const tweetInstance = tweet.update({
        like: null,
      });
    } else {
    }
  } catch {
    console.log(error);
    return res.status(401).send({
      message: "Something wrong Happened",
      success: false,
    });
  }
};

export const GetAllTweets = async (req, res) => {
  // logged in user tweets + following tweets
  try {
    const loggedInUserId = req.user;
    const loggedInUser = await User.findById(loggedInUserId);
    const loggedInUserTweets = await Tweet.find({ userId: loggedInUserId });
    const followingTweets = await Promise.all(
      loggedInUser.following.map((followinguserId) => {
        return Tweet.find({ userId: followinguserId });
      })
    );
    return res.status(200).json({
      tweets: loggedInUserTweets.concat(...followingTweets),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something wrong Happened",
      success: false,
    });
  }
};

export const GetfollowingTweet = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user);
    const tweets = (
      await Promise.all(
        loggedInUser.following.map((id) => Tweet.find({ userId: id }))
      )
    )
      .flat()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({ tweets });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something wrong Happened",
      success: false,
    });
  }
};

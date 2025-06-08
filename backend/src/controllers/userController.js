import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, username, phoneNo, email, password } = req.body;
    // CHECK BASIC  VALIDATION
    if (!username || !email || !password || !phoneNo) {
      return res.status(401).json({
        message: "All Fields are Required",
        success: false,
      });
    }
    // CHECK SAME USER VALIDATION
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User Already Exist",
        success: false,
      });
    }
    // Create Account with unique email
    const hashedPassword = await bcryptjs.hash(password, 16);
    await User.create({
      name,
      username,
      phoneNo,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: true,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // basic validation
    if (!email || !password) {
      return res.status(401).json({
        message: "All Fields are required",
        success: false,
      });
    }
    // Check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
        success: false,
      });
    }
    // userExist -> check it's password
    const matchPassword = await bcryptjs.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = await jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res
      .status(200)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "User Logged Out SuccessFully",
  });
};

export const Bookmarks = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const tweetId = req.params.id;
    const user = await User.findById(loggedInUserId);
    if (user.bookmarks.includes(tweetId)) {
      //remove the bookmark from user
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Removed from Bookmarks",
        success: true,
      });
    } else {
      //add the bookmark
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Save to Bookmarks",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// sequelize : findOne & findByPk :
export const getMyProfileSequel = async (req, res) => {
  try {
    const UserProfile = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      UserProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// mongoose
export const editUserProfile = async (req, res) => {
  try {
    const { name, userName, description } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        username: userName,
        description: description,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// sequelize update user propfile
export const editUserProfileSequelize = async (req, res) => {
  try {
    const { name, userName, description } = req.body;

    const userInstance = await User.findOne({ where: { id: req.params.id } });

    if (!userInstance) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    await userInstance.update({
      name: name,
      username: userName,
      description: description,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: userInstance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    if (otherUsers) {
      return res.status(200).json({
        otherUsers,
        message: "All Users other than logged in user",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Currently do not have many users",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getOtherUsersSequelize = async (req, res) => {
  try {
    const otherUsers = User.findAll({
      where: {
        id: {
          [Op.ne]: req.body.params, //Operators in Seqeulize
        },
      },
      attributes: { exclude: password },
    });

    if (otherUsers && otherUsers.length > 0) {
      return res.status(200).json({
        otherUsers,
        message: "All Users other than logged in user",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Currently do not have many users",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const loggedInUser = await User.findById(loggedInUserId);
    const otherUserId = req.body.id;
    const otherUser = await User.findById(otherUserId);

    console.log(loggedInUser);
    console.log(otherUserId);

    if (!loggedInUser || !otherUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!otherUser.followers.includes(loggedInUserId)) {
      await loggedInUser.updateOne({ $push: { following: otherUserId } });
      await otherUser.updateOne({ $push: { followers: loggedInUserId } });

      return res.status(200).json({
        message: `${loggedInUser.name} just followed ${otherUser.name}`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const Unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.user;
    const loggedInUser = await User.findById(loggedInUserId);
    const otherUserId = req.body.id;
    const otherUser = await User.findById(otherUserId);
    console.log(loggedInUser);
    console.log(otherUserId);

    if (!loggedInUser || !otherUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (loggedInUser.following.includes(otherUserId)) {
      console.log("entered the case");
      await otherUser.updateOne({ $pull: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $pull: { following: otherUserId } });
      return res.status(200).json({
        message: `${loggedInUser.name} just unfollowed ${otherUser.name}`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const profileImage = async (req, res) => {
  try {
    const res = await fetch(
      `https://newrr-d13eb-default-rtdb.firebaseio.com/profileImage`,
      {}
    );
  } catch (error) {}
};

export const profileImageUpload = async (req, res) => {
  console.log(req.body);
  try {
    const { image, fileName, loggedInUser } = req.body;

    if (!image) return res.status(400).send({ error: "Text is required" });

    const ref = db.ref(`image_files/${loggedInUser}`).push();
    await ref.set({
      text: image,
      fileName: fileName,
    });

    res.status(200).send({ message: "Text uploaded successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getProfileImage = async (req, res) => {
  try {
    const { loggedInUser } = req.query;

    if (!loggedInUser) {
      return res.status(400).send({ error: "User ID is required" });
    }

    const ref = db.ref(`image_files/${loggedInUser}`);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).send({ error: "No media found" });
    }

    const mediaData = snapshot.val();

    const filteredData = Object.entries(mediaData).map(
      ([id, { text, fileName }]) => ({
        id,
        text,
        fileName,
      })
    );

    res.status(200).send(filteredData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteProfileImage = async (req, res) => {
  console.log("delete request received");

  try {
    const { loggedInUser, index } = req.body;

    if (!loggedInUser || index === undefined) {
      return res.status(400).send({ error: "User ID and index are required" });
    }

    const ref = db.ref(`image_files/${loggedInUser}/${index}`);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).send({ error: "Media not found" });
    }

    await ref.remove();
    res.status(200).send({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).send({ error: error.message });
  }
};

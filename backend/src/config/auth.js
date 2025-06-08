import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user.user_id; //
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};

export default isAuthenticated;

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
  path: "../config/.env",
});

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        message: "User not Authenticated",
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Token is invalid or expired",
          success: false,
        });
      }

      req.user = decoded.user_id;
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

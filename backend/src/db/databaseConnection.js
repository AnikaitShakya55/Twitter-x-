import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "../db../src/.env",
});
const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default databaseConnection;

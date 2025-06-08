import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnection from "./src/db/databaseConnection.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/userRoute.js";
import tweetRoute from "./src/routes/tweetRoute.js";
// import "./src/config/firebase.js";

dotenv.config({
  path: ".env",
});

databaseConnection();

const app = express();

// Basic Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// api's
app.get("/home", (req, res) => {
  res.status(200).json({
    message: "COMING FROM BACKEND",
  });
});

app.use("/user-api", userRoute);
app.use("/tweet-api", tweetRoute);
app.use("/test", (req, res) => {
  res.send("<h1>test</h1>");
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`SERVER IS RUNNING ${process.env.BACKEND_PORT}`);
});

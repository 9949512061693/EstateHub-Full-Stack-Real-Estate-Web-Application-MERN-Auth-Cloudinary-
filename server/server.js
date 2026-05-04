const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const UserRoute = require("./routes/UserRoute");
const authRoute = require("./routes/authRoute");
const propertyRoute = require("./routes/propertyRoute");
//Connecting MongoDB account to Server

const { PORT, MONGODB_URL, CLIENT_URL } = process.env;

mongoose
  .connect(MONGODB_URL)
  .then((connection) => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

// apis calls

app.use("/api/user", UserRoute);
app.use("/api/auth", authRoute);
app.use("/api/property", propertyRoute);

// middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Server Runing on Port ${port}!`);
});

// First we require express to create a server
const express = require("express");

const cookieParser = require("cookie-parser");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");
const userRouter = require("./routes/user.js");

// middleware to parse request body for all the routes.
app.use(express.json());
app.use(cookieParser());

// SIGN UP POST API TO SEND DATA

app.use("/", authRouter);


// LOGIN POST API



// Profile API

app.use("/", profileRouter);

// send connection request API
app.use("/", requestRouter);

// user API
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection successfully estalished");
    // Now to listen to request we need to define on which port request is being lsitened
    app.listen(3000, () => {
      console.log("listening to server successfully on port number 3000"); // This callback will only run when server is properly setup to listen
    });
  })
  .catch((err) => console.log("Database connection failed"));

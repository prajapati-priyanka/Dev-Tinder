// First we require express to create a server
const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validateSignUpData");
const { userAuth } = require("./middlewares/auth.js");

// middleware to parse request body for all the routes.
app.use(express.json());
app.use(cookieParser());

// SIGN UP POST API TO SEND DATA

app.post("/signup", async (req, res) => {
  try {
    // validate signup data
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of the User Model
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await newUser.save();
    res.send("User successfully added");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

// LOGIN POST API

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("No User Found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // Generate JWT Token

      const jwtToken = jwt.sign({ _id: user._id }, "WORLD@123", {expiresIn: "1d"});

      // Wrap the token in the cookie and send as a response to the user
      res.cookie("token", jwtToken,{ expires: new Date(Date.now() + 900000)});
      res.status(200).send("Login Successfully!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // send user profile
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// send connection request API
app.post("/sendconnectionrequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} has sent the connection request`);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection successfully estalished");
    // Now to listen to request we need to define on which port request is being lsitened
    app.listen(3000, () => {
      console.log("listening to server successfully on port number 3000"); // This callback will only run when server is properly setup to listen
    });
  })
  .catch((err) => console.log("Database connection failed"));

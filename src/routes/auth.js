const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validateData");
const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
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

   const newSignedUpUser =  await newUser.save();
   
   

  const isValidPassword = newSignedUpUser.validatePassword(newSignedUpUser.password);

  if (isValidPassword) {
    // Generate JWT Token

    const jwtToken = await newSignedUpUser.getJwtToken();

    // Wrap the token in the cookie and send as a response to the user
    res.cookie("token", jwtToken, { expires: new Date(Date.now() + 900000) });
    res.status(200).json({data: newSignedUpUser, message: "New User Signed Up Successfully"});

   
  }
  }
  catch(error){
    console.error("Error Occurred: ", error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Credentials");
    }

    // const user = await User.findOne({ email }).select("firstName lastName age about skills photoUrl email");
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("No User Found");
    }

    const isValidPassword = user.validatePassword(user.password);

    if (isValidPassword) {
      // Generate JWT Token

      const jwtToken = await user.getJwtToken();

      // Wrap the token in the cookie and send as a response to the user
      res.cookie("token", jwtToken, { expires: new Date(Date.now() + 900000) });
      res.status(200).json({data: user, message: "You are Logged In Successfully"});
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).send("Logout Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;

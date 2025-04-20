const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateEditPasswordData,
} = require("../utils/validateData");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // send user profile
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Profile Edit");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (item) => (loggedInUser[item] = req.body[item])
    );

    //  loggedInUser.age = req.body.age;
    //  loggedInUser.about = req.body.about

    await loggedInUser.save();
    //  res.send("Profile Updated successfully");
    res.json({
      message: "Profile Updated successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validateEditPasswordData(req)) {
      throw new Error("Invalid Password");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser);
    // Generate JWT TOKEN

    const jwtToken = await loggedInUser.getJwtToken();

    // wrap this token in cookie

    res.cookie("token", jwtToken, { expires: new Date(Date.now() + 900000) });
    loggedInUser.password = req.body.password;
    await loggedInUser.save();
    res.send("Passwords Changed successfully");
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection requests received by logged in user
userRouter.get("/user/requests/recieved", userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user;
    const pendingConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "age", "skills"]);

    res.json({
      message: "These are the Connection Requests",
      data: pendingConnectionRequests,
    });
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});



module.exports = userRouter;

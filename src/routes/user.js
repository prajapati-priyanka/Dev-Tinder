const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

// get all the pending connection requests received by logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
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

// get all the connections of the loggedIn user.

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const userConnections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser, status: "accepted" },
        { toUserId: loggedInUser, status: "accepted" },
      ],
    }).populate("fromUserId", "firstName lastName age gender about");

    // Check whether there is connections from loggedIn User. means fromUserId should not be equal to loggedIn user
    const filteredUserConnections = userConnections.filter(
      (row) => row.fromUserId._id.toString() !== loggedInUser._id.toString()
    );

    if (!userConnections) {
      throw new Error("There is no Connection for this user");
    }
    res.json({
      message: "These are the connection requests",
      data: filteredUserConnections,
    });
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  // we have to get all the users which are not in connection
  // to: should not be loggedInUser
  // from: should not be loggedInUser

  const loggedInUser = req.user;
  const connectionRequest = await ConnectionRequest.find({
    $or: [{ toUserId: loggedInUser }, { fromUserId: loggedInUser }],
  }).select("fromUserId  toUserId");

  const hideUserFromFeed = new Set();

  connectionRequest.forEach((id) => {
    hideUserFromFeed.add(id.fromUserId.toString());
    hideUserFromFeed.add(id.toUserId.toString());
  });

  const uniqueUser = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUserFromFeed) } },
      {
        _id: { $ne: loggedInUser._id },
      },
    ],
  }).select("firstName lastName");

  res.send(uniqueUser);
});

module.exports = userRouter;

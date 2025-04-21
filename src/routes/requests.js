const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// this is for swipe left and right
// swipt left means => ignored
// swipt right means => interested\

// Points to consider when we sent a connection Request:
// 1. user cannot make connection request to itself.
// 2. user should exist in a database to whom connection request is being sent.
// 3. If user has sent connection request to one user OR has connection request from that user then neither of the user can be able to make a connection request.
// 4. Only Interested and Ignored statuses are allowed

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //  check if user is present in db

      const isToUserPresent = await User.findById(toUserId);

      if (!isToUserPresent) {
        throw new Error("Cannot Make Connection Request. User Does Not Exist");
      }

      // check for status

      const allowedStatusFields = ["ignored", "interested"];

      const isValidStatus = allowedStatusFields.includes(status);
      if (!isValidStatus) {
        throw new Error("Invalid Status");
      }
      // checks if fromUserId equals to toUserId
      // if (fromUserId.equals(toUserId)) {
      //   throw new Error("You cannot sent connection request to Yourself");
      // }

      // check for existing connection

      const isExistingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExistingConnection) {
        throw new Error("This connection already exists");
      }

      //  Creating instance of new Connection Request
      const newConnectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      await newConnectionRequest.save();
      res.send("Connection Request Sent Succesfully");
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStates = ["accepted", "rejected"];

      if (!allowedStates.includes(status)) {
        throw new Error("Invalid Status");
      }

  
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Invalid Connection Request");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: `Connection Request is: ${status}`, data });
    } catch (error) {
      res.send("ERROR: " + error.message);
    }
  }
);

module.exports = requestRouter;

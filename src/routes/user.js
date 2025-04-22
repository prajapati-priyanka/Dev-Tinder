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

// get all the connections of the loggedIn user.

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const userConnections = await ConnectionRequest.find({
            $or: [
              { fromUserId:loggedInUser, status:"accepted" },
              { toUserId: loggedInUser, status: "accepted" },
            ],
          }).populate("fromUserId", "firstName lastName age gender about");


        const filteredUserConnections = userConnections.filter(row => row.fromUserId._id.toString() !== loggedInUser._id.toString());

        console.log(filteredUserConnections)

          if(!userConnections){
            throw new Error("There is no Connection for this user")
          }
          res.json({message:"These are the connection requests", data: filteredUserConnections})
    } catch (error) {
        res.send("ERROR: " + error.message);
    }
})



module.exports = userRouter;

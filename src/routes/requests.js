const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendconnectionrequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} has sent the connection request`);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = requestRouter;

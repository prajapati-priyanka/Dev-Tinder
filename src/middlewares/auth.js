const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the cookies from the req,
    const { token } = req.cookies;

    // validate the token
    if (!token) {
      throw new Error("Unauthorized User !!!");
    }

    const decodedData = await jwt.verify(token, "WORLD@123");
    const { _id } = decodedData;
    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("No User Found");
    }

    req.user = user;
    next()
  } catch (error) {
    res.status(401).send("ERROR: " + error.message);
  }
};

module.exports = {
  // userAuth : userAuth
  userAuth,
};

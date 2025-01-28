// First we require express to create a server
const express = require("express");

const app = express();

const connectDB = require("./config/database");

connectDB()
  .then(() => {
    console.log("Database connection successfully estalished");
    // Now to listen to request we need to define on which port request is being lsitened
    app.listen(3000, () => {
      console.log("listening to server successfully on port number 3000"); // This callback will only run when server is properly setup to listen
    });
  }).catch((err) => console.log("Database connection failed"));


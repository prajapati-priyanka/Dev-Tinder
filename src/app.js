// First we require express to create a server
const express = require("express");

const app = express();

const connectDB = require("./config/database");
const User = require('./models/user');

app.post("/signup", async(req,res)=>{
    const newUser = new User({
        firstName : "Ankit",
        lastName: "Agarwalla",
        gender: "male",
        email: "ankit@agarwalla.com",
        password: "ankit@123"
    })

    try {
        await newUser.save();
        res.send("User successfully added");
    } catch (error) {
       res.status(500).send("Error occurred: " + error.message); 
    }

  
})

connectDB()
  .then(() => {
    console.log("Database connection successfully estalished");
    // Now to listen to request we need to define on which port request is being lsitened
    app.listen(3000, () => {
      console.log("listening to server successfully on port number 3000"); // This callback will only run when server is properly setup to listen
    });
  }).catch((err) => console.log("Database connection failed"));


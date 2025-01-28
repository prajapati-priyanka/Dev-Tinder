// First we require express to create a server
const express = require("express");

const app = express();

const connectDB = require("./config/database");
const User = require('./models/user');


// middleware to parse request body for all the routes.
app.use(express.json());

app.post("/signup", async(req,res)=>{

    console.log(req.body);

    // Creating a new instance of the User Model
    const newUser = new User(req.body);

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


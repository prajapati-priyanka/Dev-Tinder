// First we require express to create a server
const express = require("express");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");

// middleware to parse request body for all the routes.
app.use(express.json());

// POST API TO SEND DATA

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User Model
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.send("User successfully added");
  } catch (error) {
    res.status(500).send("Error occurred: " + error.message);
  }
});

// GET API TO GET ALL THE USERS or FEED API

app.get("/feed", async(req,res)=>{
// get all the documents(means all users) of user collection
//    const allUsers = await User.find({});

// get all the documents of name "Lata"
const userBySameName = await User.find({firstName: "Lata"});
   res.send(userBySameName);
})

// PATCH API

app.patch("/user", async (req,res)=>{
  try {
  const updatedUserInfo = await User.findByIdAndUpdate({_id: req.body.userId}, req.body,{
    returnDocument: "after",
    runValidators: true
  });
  res.send("User Updated Successfully");
  } catch (error) {
    res.send("Update failed: " + error.message);
  }
  
})

connectDB()
  .then(() => {
    console.log("Database connection successfully estalished");
    // Now to listen to request we need to define on which port request is being lsitened
    app.listen(3000, () => {
      console.log("listening to server successfully on port number 3000"); // This callback will only run when server is properly setup to listen
    });
  })
  .catch((err) => console.log("Database connection failed"));

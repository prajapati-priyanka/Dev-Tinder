// First we require express to create a server
const express = require("express");
const bcrypt = require('bcrypt');

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validateSignUpData")

// middleware to parse request body for all the routes.
app.use(express.json());

// POST API TO SEND DATA

app.post("/signup", async (req, res) => {


  try {
      // validate signup data
  validateSignUpData(req);

  const {firstName, lastName, email, password} = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
   // Creating a new instance of the User Model
  const newUser = new User({firstName, lastName, email, password: passwordHash});

    await newUser.save();
    res.send("User successfully added");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
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

app.patch("/user/:userId", async (req,res)=>{

  const userId = req.params?.userId;
  const data = req.body;
  try {

  const ALLOWED_UPDATES = ["age", "gender", "skills", "photoUrl"];

  const updatesAllowed = Object.keys(data).every(item => ALLOWED_UPDATES.includes(item));

  if(!updatesAllowed){
    throw new Error("Updates Not Allowed")
  }
  if(data.skills.length > 5){
    throw new Error("You cannot add skills more than 5");
  }

  const updatedUserInfo = await User.findByIdAndUpdate({_id: userId}, data,{
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

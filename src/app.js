// First we require express to create a server 
const express = require("express");

const app = express();

const {authAdmin} = require('./middlewares/auth');

// app.use("/", (err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Error Occurred: Something went wrong");

//     }
// })

app.get("/getUserData", (req,res)=>{
    throw new Error("Something went wrong");
    res.send("User Data Sent");
})

app.use("/", (err,req,res,next)=>{
    if(err){
        res.status(500).send("Error Occurred: Something went wrong");

    }
})


// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
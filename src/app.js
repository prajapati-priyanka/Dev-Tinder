// First we require express to create a server 
const express = require("express");

const app = express();

const {authAdmin} = require('./middlewares/authMiddleware');

app.use("/admin", authAdmin);

app.use("/user", (req,res)=>{
    res.send("user")
})

app.get("/admin/getAllData",  (req,res)=>{
    console.log("Got All Data");
    res.status(200).send("Yay!!! Got all the data");
});
app.delete("/admin/deleteData", (req,res)=>{
    console.log("Data Deleted");
    res.status(200).send("Data is deleted");
});

// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
// First we require express to create a server 
const express = require("express");

const app = express();

// way to send request

app.use("/",(req,res)=>{
    res.send("Hello from the HOME PAGE in the server....");  // This is the request handler callback
})

app.use("/hello",(req,res)=>{
    res.send("Hello from the server....");  // This is the request handler callback
})

app.use("/test",(req,res)=>{
    res.send("Hello from the test route in the server....");  // This is the request handler callback
})

// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
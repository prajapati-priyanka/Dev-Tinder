// First we require express to create a server 
const express = require("express");

const app = express();

// way to send request

// app.use("/",(req,res)=>{
//     res.send("Hello from the HOME PAGE in the server....");  // This is the request handler callback
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello from the server....");  // This is the request handler callback
// })

// app.use("/hello/hello",(req,res)=>{
//     res.send("Hello Hello from the server...");  // This is the request handler callback
// })

app.use("/user", (req,res)=>{
    res.send("Orders matters dude HAHAHAHAHAH !!");
})

// This will only handle GET call to user
app.get("/user", (req,res)=>{
    res.send({firstName: "Priyanka", lastName: "Prajapati"});
})


// This will only handle POST call to user

app.post("/user", (req,res)=>{
    // this will save data to the database
    res.send("Data successfully saved to database");
})

// This will only handle DELETE call to user

app.delete("/user", (req,res)=>{
    res.send("Data is successfully deleted from the database");
})

// This will match all the http methods API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the test route in the server....");  // This is the request handler callback
})

// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
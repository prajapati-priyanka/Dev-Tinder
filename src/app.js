// First we require express to create a server 
const express = require("express");

const app = express();

// different syntaxes for combining different routeHandlers

// app.use("/routes", rH1,rh2,rH3,rH4,rH4);
// app.use("/routes", [rH1,rh2,rH3,rH4,rH4]);
// app.use("/routes", [rH1,rh2],rH3,rH4,rH4);
// app.use("/routes", rH1,rh2,[rH3],rH4,rH4);

app.use("/user", (req,res,next)=>{
    console.log("Response 1");
    // res.send("Response 1");
    next(); // use to call next callback. if not then second callback is not called
},(req,res,next)=>{
    console.log("Response 2");
    // res.send("Response 2");
    next() // it shows that express is expecting response handler. if no response handler then it will say cannot get user routes

})




// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
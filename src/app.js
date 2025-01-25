// First we require express to create a server 
const express = require("express");

const app = express();


// Use of ? mark in routes. b will become optional. MEans we can routes /abc or /ac both will work
// app.get("/ab?c", (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// })


// Use of + mark in routes. MEans we can add as many b's between b and c. Eg /abc or /abbbbbbbbbbbbbbbbc both will work
// app.get("/ab+c", (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// })


// Use of () mark in routes. bc will become optional. MEans we can routes /abcd or /ad both will work
// app.get("/a(bc)?d", (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// })

// Use of * mark in routes. anything can be added between ab and c. MEans we can routes /abc or /absoaiuoiudc or /ab8hdid90jec anything will work
// app.get("/ab*c", (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// })

// Use of regex /a/ and /.*fly$/

//**** it will gove resilt if a is there in the route
// app.get(/a/, (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// });

//  it will gove reslut for every name which ends with fly. Eg. dragonfly, butterfly, fly
// app.get(/.*fly$/, (req,res)=>{
//     res.send({firstName: "Priyanka", lastName: "Prajapati"});
// });


// USe of query and params method. 

app.get("/user/:id/:name", (req,res)=>{
    // console.log(req.query);
    console.log(req.params)
    
    res.send({firstName: "Priyanka", lastName: "Prajapati"});
});



// Now to listen to request we need to define on which port request is being lsitened
app.listen(3000, ()=>{
    console.log("listening to server successfully on port number 3000") // This callback will only run when server is properly setup to listen
})
const mongoose = require("mongoose");

const connectDB = async()=>{
    // mongoose.connect returns a promise
    await mongoose.connect("mongodb+srv://priyanka-prajapti:a1QtDpnAWlile2vk@nodedemoproject.m3fuv.mongodb.net/devTinder");
}

module.exports = connectDB;



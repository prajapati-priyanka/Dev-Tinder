const validator = require('validator');
const User = require('../models/user');

const validateSignUpData = (req)=>{
const {firstName, lastName, email,password} = req.body;
 if(firstName === '' || lastName === ''){
    throw new Error("Enter valid Name");
 }
 else if(firstName.length < 4 || firstName.length > 50){
      throw new Error("Enter valid Name");
 }
 else if (!validator.isEmail(email)){
    throw new Error("Enter valid email");
    
 }else if(!validator.isStrongPassword(password)){
    throw new Error("Enter strong password");

 }
}

const validateEditProfileData = req =>{

   const allowedEditFields = ["firstName", "lastName", "email", "age", "gender", "photoUrl", "about", "skils"];

   const isEditAllowed = Object.keys(req.body).every(fields => allowedEditFields.includes(fields));

   return isEditAllowed;
}

const validateEditPasswordData = async(req) =>{
   const {email, password} = req.body;

   if(!validator.isEmail(email)){
      throw new Error("Invalid Email !!")
   }
   
   const user = await User.findOne({email});

   if(!user){
      throw new Error("No User Found");
   }

   const isPasswordValid = user.validatePassword(password);

   return isPasswordValid;
   
}

module.exports = {
   validateSignUpData,
   validateEditProfileData,
   validateEditPasswordData
}
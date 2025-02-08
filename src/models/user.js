const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
    lowercase: true
  },
  photoUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  },
  about: {
    type: String,
    default: "This is the about section",
  },
  skills: {
    type: [String],
  },

}, {timestamps: true});

userSchema.methods.getJwtToken = async function(){

  const user = this;

  const token = await jwt.sign({ _id: user._id }, "WORLD@123", { expiresIn: "1d" })
  return token;
  
};

userSchema.methods.validatePassword = async function(userInputPassword){
  const user = this;
  const isPasswordValid = await bcrypt.compare(userInputPassword, user.password);

  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

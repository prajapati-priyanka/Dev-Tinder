const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
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

const User = mongoose.model("User", userSchema);

module.exports = User;

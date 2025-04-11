// schema for user

// import mongoose
const mongoose = require("mongoose");

// define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // each username should be different
      trim: true, // removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // makes all emails lowercase to avoid duplicates
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // auto-creates `createdAt` and `updatedAt`
  });

// Create the model from the schema
const User = mongoose.model('User', userSchema)

// export it
module.exports = User
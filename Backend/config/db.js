// connects express backend to MongoDB using mongoose

const mongoose = require("mongoose");


require('dotenv').config   // load env var like mongo_uri from .env

const connectDB = async () => {
    try {
      // 4. Try connecting using mongoose.connect() with the MONGO_URI from .env

      await mongoose.connect(process.env.MONGO_URI);

      console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error.message);
      process.exit(1); // Force exit the process
    }
};

// 7. Export the function to use it in index.js
module.exports = connectDB
// loads .env var
require('dotenv').config();

// import express
const express = require('express')
const app = express();

// import our connection function 
const connectDB = require('./config/db')

// connect to Mongodb
connectDB();  //this starts the connection process

// middleware to parse json
app.use(express.json());

//  Test route to verify server is working
app.get('/', (req, res) => {
    res.send("🚀 API is running...");
})

//  Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);  
})
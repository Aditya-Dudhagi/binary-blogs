// loads .env var
require('dotenv').config();

// import express
const express = require('express')
const app = express();
const testRoutes = require('./routes/test')


// middleware to parse json
app.use(express.json());

// import our connection function 
const connectDB = require('./config/db')

// connect to Mongodb
connectDB();  //this starts the connection process



//  Test route to verify server is working
app.get('/', (req, res) => {
    res.send("🚀 API is running...");
})

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)   // Makes all routes in auth.js start with /api — like /api/register

app.use('/api/test', testRoutes)

//  Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);  
})
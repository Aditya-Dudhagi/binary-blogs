// loads .env var
require('dotenv').config();

// import express
const express = require('express')
const app = express();
const authRoutes = require("./routes/auth");
const testRoutes = require('./routes/test')
const blogRoutes = require('./routes/blog')


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


app.use('/api/auth', authRoutes)   // Makes all routes in auth.js start with /api — like /api/register

app.use('/api/test', testRoutes)

app.use('/api/blog', blogRoutes)

//  Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
    console.log(`⚡ Server running on http://localhost:${PORT}`);  
})
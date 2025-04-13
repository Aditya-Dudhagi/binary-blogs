const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs')
const User = require("../models/Users");
const authController = require('../controllers/authController');

const jwt = require('jsonwebtoken')

// building the /register route

// router.post('/register',async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const existingUser = await User.findOne({email})
//         if (existingUser) {
//             return res.status(400).json({message: "User already exists"})
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         // create and save new user
//         const newUser = new User({
//             username,
//             email,
//             password : hashedPassword,
//         })
        
//         console.log("Saving user:", newUser);

//         await newUser.save();

//         res.status(201).json({message: 'User registered successfully'})
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error')
//     }
// })

router.post("/register", authController.signUp);  

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    // console.log(req.body);
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    // if password is valid, create a JWT token
    const token = jwt.sign(
      { id: user._id },             // Payload (user info)
      process.env.JWT_SECRET,       //secret key (stored in .env)
      { expiresIn: "1d" }           // optional expiry time (e.g., 1 day)
    );

    // return token and user info in response
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


    // res.send("Login route works")
})


module.exports = router;
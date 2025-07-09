const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    
    // create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log("Saving user:", newUser);

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id }, // Payload (user info)
      process.env.JWT_SECRET, //secret key (stored in .env)
      { expiresIn: "1d" } // optional expiry time (e.g., 1 day)
    );

    res.status(201).json({ message: "User registered successfully", newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// Protected route test
router.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Access granted to protected route!",
    user: req.user, // This is the decoded user info from the token
  });
});

module.exports = router;

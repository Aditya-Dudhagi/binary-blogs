const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    // 1. get token from headers
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Access denied. No token provided."})
    }
    
    const token = authHeader.split(" ")[1];  // extract the token part

    try {
      // 2. verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user info to the request object
        req.user = decoded

        // 4. move to next middleware or route
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid or expired token"})
    }
}

module.exports = verifyToken
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1]; // Expects "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token using your JWT_SECRET (this should be stored in your .env file)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        req.user = decoded; // Store decoded user data in req.user
        next(); // Allow the request to proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};

export default authenticateToken;

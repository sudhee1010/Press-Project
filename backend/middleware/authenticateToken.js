import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token; // Get token from HttpOnly cookie

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};

export default authenticateToken;

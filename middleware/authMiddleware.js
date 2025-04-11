import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      // Get token from request header
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access Denied. No token provided." });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check user role permissions
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Unauthorized. Insufficient permissions." });
      }

      // Attach user data to request object
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token." });
    }
  };
};

// Middleware to protect routes with JWT authentication
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

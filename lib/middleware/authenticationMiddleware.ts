import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Access denied! No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token!" });
    }

    // Ensure the token contains userId
    if (!decodedToken || typeof decodedToken !== "object" || !("user" in decodedToken)) {
      return res.status(403).json({ message: "Invalid token payload!" });
    }

    req.user = decodedToken.user; // Store user details in req.user
    next();
  });
};

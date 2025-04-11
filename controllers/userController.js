import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Create JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", {
    expiresIn: "7d",
  });
};

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered" });

    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Update role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ error: "Role update failed" });
  }
};

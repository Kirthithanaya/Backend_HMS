import express from "express";
import { getProfile, login, register } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register); // Register (Admin, Staff, Resident)
router.post("/login", login); // Login
router.get(
  "/profile",
  authMiddleware(["admin", "staff", "resident"]),
  getProfile
);

export default router;

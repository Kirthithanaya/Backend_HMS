import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUserRole,
} from "../controllers/userController.js";
import { authMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

// Admin-only routes
router.get("/get", protect, authMiddleware("admin"), getAllUsers);
router.put("/role", protect, authMiddleware("admin"), updateUserRole);

export default router;

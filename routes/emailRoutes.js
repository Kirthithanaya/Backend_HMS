import express from "express";
import { sendEmail } from "../controllers/emailController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST: Send email via Nodemailer
router.post("/send", protect, adminOnly, sendEmail);

export default router;

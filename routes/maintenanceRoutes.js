import express from "express";
import {
  createRequest,
  getAllRequests,
  getMyRequests,
  updateRequest,
} from "../controllers/maintenanceController.js";
import { authMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Resident creates request
router.post("/create", protect, authMiddleware("resident"), createRequest);

// Resident views their requests
router.get("/my", protect, authMiddleware("resident"), getMyRequests);

// Admin/Staff view all
router.get("/get", protect, authMiddleware("admin", "staff"), getAllRequests);

// Admin/Staff update
router.put("/:id", protect, authMiddleware("admin", "staff"), updateRequest);

export default router;

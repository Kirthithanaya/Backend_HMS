import express from "express";
import {
  createResident,
  deleteResident,
  getAllResidents,
  getResidentById,
  updateResident,
} from "../controllers/residentController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post(
  "/create",
  protect,
  authorizeRoles("admin", "staff"),
  createResident
);
router.get("/get", protect, authorizeRoles("admin", "staff"), getAllResidents);
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "staff", "user"),
  getResidentById
);
router.put("/:id", protect, authorizeRoles("admin", "staff"), updateResident);
router.delete("/:id", protect, authorizeRoles("admin"), deleteResident);

export default router;

import express from "express";
import {
  assignRoom,
  checkoutResident,
  createRoom,
  deleteRoom,
  getAllRooms,
} from "../controllers/roomController.js";

import { authMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, authMiddleware(["admin"]), createRoom);
router.get("/get", protect, authMiddleware(["admin", "staff"]), getAllRooms);
router.post("/assign", protect, authMiddleware(["admin"]), assignRoom);
router.post("/checkout", protect, authMiddleware(["admin"]), checkoutResident);
router.delete("/:roomId", protect, authMiddleware(["admin"]), deleteRoom);

export default router;

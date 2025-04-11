import express from "express";
import {
  generateInvoice,
  getMyInvoices,
  getPaymentHistory,
  processPayment,
} from "../controllers/billingController.js";
import { authMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin: Create Invoice
router.post("/invoice", protect, authMiddleware("admin"), generateInvoice);

// Resident: View my invoices
router.get("/my-invoices", protect, authMiddleware("resident"), getMyInvoices);

// Resident: Pay invoice
router.post("/pay", protect, authMiddleware("resident"), processPayment);

// Admin/Resident: View payment history
router.get(
  "/payments",
  protect,
  authMiddleware("admin", "resident"),
  getPaymentHistory
);

export default router;

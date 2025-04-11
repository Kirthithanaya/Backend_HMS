import express from "express";
import {
  addRoom,
  createExpense,
  createPayment,
  getExpenses,
  getMonthlyTrends,
  getOverviewReport,
  getPayments,
} from "../controllers/financialController.js";

const router = express.Router();

router.get("/overview", getOverviewReport);
router.get("/trends", getMonthlyTrends);

// Add new payment
router.post("/create", createPayment);

// Get all payments
router.get("/get", getPayments);

// Add new expense
router.post("/create", createExpense);
// Get all expenses
router.get("/", getExpenses);

// Route to add room
router.post("/add", addRoom);

export default router;

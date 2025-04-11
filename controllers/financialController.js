import Expense from "../models/Expense.js";
import Payment from "../models/Payment.js";
import Room from "../models/Room.js";
import { calculateTotal, groupByMonth } from "../utils/reportUtils.js";

// GET: Revenue, Expense, Profit, Occupancy
export const getOverviewReport = async (req, res) => {
  try {
    const [payments, expenses, rooms] = await Promise.all([
      Payment.find(),
      Expense.find(),
      Room.find(),
    ]);

    const totalRevenue = calculateTotal(payments);
    const totalExpenses = calculateTotal(expenses);
    const profit = totalRevenue - totalExpenses;

    const occupiedRooms = rooms.filter((room) => room.occupied).length;
    const totalRooms = rooms.length;
    const occupancyRate =
      totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

    res.json({
      totalRevenue,
      totalExpenses,
      profit,
      occupancyRate: occupancyRate.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate overview report" });
  }
};

// @desc    Add a new payment
// @route   POST /api/payments
export const createPayment = async (req, res) => {
  try {
    const {
      residentId,
      amountPaid,
      date,
      description,
      invoiceId,
      method,
      status,
    } = req.body;

    const payment = new Payment({
      residentId,
      amountPaid,
      date,
      description,
      invoiceId,
      method,
      status,
    });

    await payment.save();
    res.status(201).json({ message: "Payment added successfully", payment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add payment", details: error.message });
  }
};

// @desc    Get all payments
// @route   GET /api/payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch payments", details: error.message });
  }
};

// GET: Monthly Revenue and Expense Trends
export const getMonthlyTrends = async (req, res) => {
  try {
    const [payments, expenses] = await Promise.all([
      Payment.find(),
      Expense.find(),
    ]);

    const revenueTrend = groupByMonth(payments);
    const expenseTrend = groupByMonth(expenses);

    res.json({ revenueTrend, expenseTrend });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate monthly trends" });
  }
};
// @desc    Add a new expense
// @route   POST /api/expenses
export const createExpense = async (req, res) => {
  try {
    const { category, amountPaid, date, description, method, status } =
      req.body;

    const expense = new Expense({
      category,
      amountPaid,
      date,
      description,
      method,
      status,
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add expense", details: error.message });
  }
};

// @desc    Get all expenses
// @route   GET /api/expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses", details: error.message });
  }
};

// Add a new room
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, type, capacity } = req.body;

    // Check if room already exists
    const exists = await Room.findOne({ roomNumber });
    if (exists) {
      return res.status(400).json({ error: "Room already exists" });
    }

    const room = new Room({ roomNumber, type, capacity });
    await room.save();

    res.status(201).json({ message: "Room added successfully", room });
  } catch (err) {
    res.status(500).json({ error: "Failed to add room", details: err.message });
  }
};

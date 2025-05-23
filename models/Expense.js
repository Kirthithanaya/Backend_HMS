import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: String,
  amountPaid: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  method: {
    type: String,
    enum: ["cash", "bank transfer", "online", "other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Failed"],
    default: "Success",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;

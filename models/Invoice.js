import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomFee: { type: Number, required: true },
    utilitiesFee: { type: Number, default: 0 },
    servicesFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    lateFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Unpaid", "Paid", "Overdue"],
      default: "Unpaid",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;

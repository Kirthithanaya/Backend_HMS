import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
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
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    method: {
      type: String,
      enum: ["Stripe", "PayPal", "Cash"],
      required: true,
    },
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
    date: { type: Date, default: Date.now },
    description: String,
    currency: {
      type: String,
      default: "usd",
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

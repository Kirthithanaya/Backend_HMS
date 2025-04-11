import Invoice from "../models/Invoice.js";
import Payment from "../models/Payment.js";
import { calculateTotal } from "../utils/calculateCharges.js";

// Admin: Generate Invoice
export const generateInvoice = async (req, res) => {
  const {
    residentId,
    roomFee,
    utilitiesFee,
    servicesFee,
    discount,
    lateFee,
    dueDate,
  } = req.body;

  const totalAmount = calculateTotal({
    roomFee,
    utilitiesFee,
    servicesFee,
    discount,
    lateFee,
  });

  try {
    const invoice = await Invoice.create({
      residentId,
      roomFee,
      utilitiesFee,
      servicesFee,
      discount,
      lateFee,
      dueDate,
      totalAmount,
    });
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Resident: View my invoices
export const getMyInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ residentId: req.user.id });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Process Payment (Stub for Stripe/PayPal)
export const processPayment = async (req, res) => {
  const { invoiceId, amountPaid, method } = req.body;
  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    if (amountPaid < invoice.totalAmount) {
      return res.status(400).json({ message: "Insufficient amount paid" });
    }

    invoice.status = "Paid";
    await invoice.save();

    const payment = await Payment.create({
      invoiceId,
      residentId: req.user.id,
      amountPaid,
      method,
    });

    res.status(200).json({ message: "Payment successful", payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin/Resident: View payment history
export const getPaymentHistory = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { residentId: req.user.id };
    const payments = await Payment.find(query).populate("invoiceId");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

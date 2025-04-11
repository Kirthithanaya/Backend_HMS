import Payment from "../models/Payment.js";

// @desc    Create a new payment
// @route   POST /api/payments
// @access  Protected (Staff/Admin)
export const createPayment = async (req, res) => {
  try {
    const {
      residentId,
      invoiceId,
      amountPaid,
      paymentMethod,
      status,
      transactionId,
      description,
      method,
    } = req.body;

    const payment = new Payment({
      residentId,
      invoiceId,
      amountPaid,
      paymentMethod,
      status,
      transactionId,
      description,
      method,
    });

    const savedPayment = await payment.save();
    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      data: savedPayment,
    });
  } catch (error) {
    console.error("Create payment error:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

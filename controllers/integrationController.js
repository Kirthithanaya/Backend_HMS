import { transporter } from '../Database/nodemailer.js';
import { stripe } from '../Database/stripe.js';




// Send Email
export const sendEmail = async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: process.env.PASS_MAIL,
    to: email,
    subject: 'Hostel Notification',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};

// Create Payment Session
export const createPayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100, // in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment session', details: err.message });
  }
};

// Backup Data
export const backup = (req, res) => {
  try {
    const path = backup();
    res.status(200).json({ message: 'Backup successful', file: path });
  } catch (err) {
    res.status(500).json({ error: 'Backup failed', details: err.message });
  }
};

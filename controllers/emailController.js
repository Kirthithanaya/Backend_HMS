import { transporter } from "../Database/nodemailer.js";

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.PASS_MAIL,
      to,
      subject,
      text,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { sendEmail } from "../services/emailService.js";
import { sendSMS } from "../services/twilioService.js";
// Optional: in-app notifications (not implemented here)

export const sendNotification = async (req, res) => {
  try {
    const { user, subject, message, type } = req.body;

    // Validate required fields
    if (!user) {
      return res.status(400).json({ error: "User object is missing" });
    }

    if (!message || !type) {
      return res.status(400).json({ error: "Message and type are required" });
    }

    // Handle notification type
    if (type === "email") {
      if (!user.email) {
        return res
          .status(400)
          .json({ error: "User email is required for email notifications" });
      }
      await sendEmail(user.email, subject || "Notification", message);
      return res
        .status(200)
        .json({ message: "Email notification sent successfully" });
    } else if (type === "sms") {
      if (!user.phone) {
        return res
          .status(400)
          .json({
            error: "User phone number is required for SMS notifications",
          });
      }
      await sendSMS(user.phone, message);
      return res
        .status(200)
        .json({ message: "SMS notification sent successfully" });
    } else if (type === "in-app") {
      // You can add DB logic here to store in-app messages
      return res
        .status(200)
        .json({ message: "In-app notification stored (mock)" });
    } else {
      return res
        .status(400)
        .json({
          error: "Invalid notification type. Must be email, sms, or in-app.",
        });
    }
  } catch (error) {
    console.error("Notification Error:", error); // 👈 shows actual error in terminal
    res
      .status(500)
      .json({ error: error.message || "Failed to send notification" });
  }
};

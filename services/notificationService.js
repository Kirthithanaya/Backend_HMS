import Notification from "../models/Notification.js";

exports.sendNotification = async ({ userId, type, message, email, phone }) => {
  // Save in-app notification
  if (type === "in-app") {
    await Notification.create({ userId, type, message });
  }

  // Send Email
  if (type === "email" && email) {
    await emailService.sendEmail(email, "Hostel Notification", message);
  }

  // Send SMS
  if (type === "sms" && phone) {
    await smsService.sendSMS(phone, message);
  }
};

exports.getNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

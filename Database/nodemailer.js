import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or use your SMTP
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY,
  },
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connnectDB from "./Database/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
import Resident from "./routes/residentRoutes.js";
import Room from "./routes/roomRoutes.js";
import Maintenance from "./routes/maintenanceRoutes.js";
import Billing from "./routes/billingRoutes.js";
import Financial from "./routes/financialRoutes.js";
import Users from "./routes/userRoutes.js";
import sms from "./routes/smsRoutes.js";
import helmet from "./middleware/secureHeaders.js";
import sendEmail from "./routes/emailRoutes.js";
import payment from "./routes/paymentRoutes.js";
import Notification from "./routes/notificationRoutes.js";
import integration from "./routes/integrationRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connnectDB();
app.use(helmet);

app.get("/", (req, res) => {
  res.send("Welcome to Backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/room", Room);
app.use("/api/resident", Resident);
app.use("/api/maintenance", Maintenance);
app.use("/api/billing", Billing);
app.use("/api/financial", Financial);
app.use("/api/payment", payment);
app.use("/api/Users", Users);
app.use("/api/sms", sms);
app.use("/api/email", sendEmail);
app.use("/api/notification", Notification);
app.use("/api/integration", integration);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port `, port);
});

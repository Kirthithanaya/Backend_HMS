import express from "express";
import { backup, createPayment, sendEmail } from "../controllers/integrationController.js";




const router = express.Router();


router.post('/send-email', sendEmail);
router.post('/create-payment', createPayment);
router.get('/backup', backup);

export default router;
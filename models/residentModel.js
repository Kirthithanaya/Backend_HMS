import mongoose from "mongoose";

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  gender: String,
  roomNumber: {
    type: String,
  },
  checkInDate: {
    type: Date,
    default: Date.now,
  },
  checkOutDate: Date,
  status: {
    type: String,
    enum: ["active", "checked-out"],
    default: "active",
  },
});

const Resident = mongoose.model("Resident", residentSchema);

export default Resident;

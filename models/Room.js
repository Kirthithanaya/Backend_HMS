import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ["Single", "Double", "Dorm"], required: true },
  capacity: { type: Number, required: true },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Residents
  status: {
    type: String,
    enum: ["Available", "Occupied"],
    default: "Available",
  },
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    default: null,
  },
  occupied: Boolean,
});

const Room = mongoose.model("Room", roomSchema);

export default Room;

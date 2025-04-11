import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updates: [
      {
        date: { type: Date, default: Date.now },
        message: String,
      },
    ],
  },
  { timestamps: true }
);

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

export default Maintenance;

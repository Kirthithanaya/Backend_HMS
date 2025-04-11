import Maintenance from "../models/Maintenance.js";

// Create request (Resident)
export const createRequest = async (req, res) => {
  const { issue, priority } = req.body;
  try {
    const request = await Maintenance.create({
      residentId: req.user.id,
      issue,
      priority,
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all requests (Admin/Staff)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find().populate("residentId assignedTo");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my requests (Resident)
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find({ residentId: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status / assign (Admin/Staff)
export const updateRequest = async (req, res) => {
  const { status, assignedTo, updateMsg } = req.body;
  try {
    const request = await Maintenance.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Not found" });

    if (status) request.status = status;
    if (assignedTo) request.assignedTo = assignedTo;
    if (updateMsg) request.updates.push({ message: updateMsg });

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

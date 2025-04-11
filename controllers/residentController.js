import Resident from "../models/residentModel.js";

// Create a resident
export const createResident = async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all residents
export const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get resident by ID
export const getResidentById = async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident)
      return res.status(404).json({ message: "Resident not found" });
    res.json(resident);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update resident info
export const updateResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(resident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete resident
export const deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);
    if (!resident)
      return res.status(404).json({ message: "Resident not found" });
    res.json({ message: "Resident removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

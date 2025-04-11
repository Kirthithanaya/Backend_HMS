import Room from "../models/Room.js";
import Resident from "../models/residentModel.js";

// ✅ Create Room (Admin Only)
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, capacity } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom)
      return res.status(400).json({ message: "Room already exists" });

    const room = new Room({ roomNumber, type, capacity });
    await room.save();

    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("occupants", "name email");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a room to a resident (Check-In)
export const assignRoom = async (req, res) => {
  const { residentId, roomNumber } = req.body;

  const room = await Room.findOne({ roomNumber });
  if (!room || room.status === "Occupied")
    return res.status(400).json({ message: "Room not available" });

  const resident = await Resident.findById(residentId);
  if (!resident) return res.status(404).json({ message: "Resident not found" });

  room.status = "Occupied";
  room.resident = residentId;
  resident.room = room._id;
  resident.checkInDate = new Date();

  await room.save();
  await resident.save();
  res.json({ message: "Room assigned successfully" });
};

export const checkoutResident = async (req, res) => {
  const { residentId } = req.body;

  try {
    const resident = await Resident.findById(residentId);
    if (!resident) {
      return res.status(404).json({ error: "Resident not found" });
    }

    if (!resident.roomNumber) {
      return res.status(400).json({ error: "Resident has no assigned room" });
    }

    const room = await Room.findOne({ roomNumber: resident.roomNumber });
    if (!room) {
      return res.status(404).json({ error: "Assigned room not found" });
    }

    // Update room to available
    room.status = "Available";
    await room.save();

    // Update resident status and clear room
    resident.status = "checked-out";
    resident.roomNumber = null;
    await resident.save();

    res.status(200).json({
      message: `Resident ${resident.name} has been checked out from room ${room.roomNumber}.`,
      resident,
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Room (Admin Only)
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

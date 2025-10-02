import Lorry from "../Model/LorryModel.js";

// Get all lorries
export const getLorries = async (req, res) => {
  try {
    const lorries = await Lorry.find();
    res.status(200).json(lorries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lorries", error: err });
  }
};

// Get lorry by ID
export const getLorryById = async (req, res) => {
  try {
    const lorry = await Lorry.findById(req.params.id);
    if (!lorry) return res.status(404).json({ message: "Lorry not found" });
    res.status(200).json(lorry);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lorry", error: err });
  }
};

// Add new lorry
export const addLorry = async (req, res) => {
  try {
    const newLorry = await Lorry.create(req.body);
    res.status(201).json(newLorry);
  } catch (err) {
    res.status(500).json({ message: "Error adding lorry", error: err });
  }
};

// Update lorry
export const updateLorry = async (req, res) => {
  try {
    const updatedLorry = await Lorry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLorry) return res.status(404).json({ message: "Lorry not found" });
    res.status(200).json(updatedLorry);
  } catch (err) {
    res.status(500).json({ message: "Error updating lorry", error: err });
  }
};

// Delete lorry
export const deleteLorry = async (req, res) => {
  try {
    const deletedLorry = await Lorry.findByIdAndDelete(req.params.id);
    if (!deletedLorry) return res.status(404).json({ message: "Lorry not found" });
    res.status(200).json({ message: "Lorry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lorry", error: err });
  }
};

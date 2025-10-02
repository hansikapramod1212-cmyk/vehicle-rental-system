const Bike = require("../Model/Bikemodel");

// Get all bike rentals
const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bikes", error: err });
  }
};

// Add new bike rental
const addBike = async (req, res) => {
  try {
    const newBike = new Bike(req.body);
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving bike rental", error: err });
  }
};

// Get bike rental by ID
const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bike", error: err });
  }
};

// Update bike rental
const updateBike = async (req, res) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBike) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json(updatedBike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating bike", error: err });
  }
};

// Delete bike rental
const deleteBike = async (req, res) => {
  try {
    const deletedBike = await Bike.findByIdAndDelete(req.params.id);
    if (!deletedBike) return res.status(404).json({ message: "Bike not found" });
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting bike", error: err });
  }
};

module.exports = { getBikes, addBike, getBikeById, updateBike, deleteBike };

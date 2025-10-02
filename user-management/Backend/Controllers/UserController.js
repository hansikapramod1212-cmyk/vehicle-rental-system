const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

// Add a new user
const addUsers = async (req, res) => {
  const { name, gmail, age, address } = req.body;
  let user;

  try {
    user = new User({ name, gmail, age, address });
    await user.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add user", error: err });
  }

  return res.status(201).json({ user });
};

// Get user by ID
const getById = async (req, res) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

// Update user by ID
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, gmail, age, address } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(
      id,
      { name, gmail, age, address },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update user", error: err });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete user", error: err });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

// Export all functions
module.exports = {
  addUsers,
  getAllUsers,
  getById,
  updateUser,
  deleteUser,
};

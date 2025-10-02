console.log("hi");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const userRouter = require("./Route/UserRoutes");
const bookingRouter = require("./Route/bookingRoutes"); // <-- Booking routes

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);       // User routes
app.use("/bookings", bookingRouter); // Booking CRUD routes

// MongoDB connection
mongoose
  .connect("mongodb+srv://Admin:pKFiAilbCyrZEEP5@cluster0.ctferfm.mongodb.net/vehicleRentalDB?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Registration model
require("./Model/Register");
const User = mongoose.model("Register");

// Register endpoint
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await User.create({ name, gmail, password });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "err", error: err.message });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) {
      return res.json({ err: "User Not Found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ err: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error" });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

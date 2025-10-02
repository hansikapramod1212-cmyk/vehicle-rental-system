import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routers
import userRouter from "./Route/UserRoutes.js";
import bikeRouter from "./Route/BikeRoutes.js"; // Bike rental routes
import lorryRouter from "./Route/LorryRoutes.js"; // Lorry rental routes

// Models
import "./Model/Register.js"; // User model
import "./Model/Bikemodel.js"; // Bike model
import "./Model/LorryModel.js"; // Lorry model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter); // User registration/login routes
app.use("/bikes", bikeRouter); // Bike rental routes
app.use("/lorries", lorryRouter); // Lorry rental routes

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Admin:pKFiAilbCyrZEEP5@cluster0.ctferfm.mongodb.net/vehicleDB",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Model
const User = mongoose.model("Register");

// Register Endpoint
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await User.create({ name, gmail, password });
    res.status(201).json({ status: "ok", message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ status: "err", message: "Error registering user", error: err });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) return res.status(404).json({ err: "User not found" });

    if (user.password === password) {
      return res.status(200).json({ status: "ok", message: "Login successful" });
    } else {
      return res.status(401).json({ err: "Incorrect password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ err: "Server error", error: err });
  }
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

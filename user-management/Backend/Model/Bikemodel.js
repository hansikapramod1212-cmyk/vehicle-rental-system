const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  bikeModel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ["Cash", "Card", "UPI"] 
  },
}, { timestamps: true });

module.exports = mongoose.model("Bike", bikeSchema);

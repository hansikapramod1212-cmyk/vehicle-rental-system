const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

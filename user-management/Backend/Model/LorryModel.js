import mongoose from "mongoose";

const lorrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    lorryModel: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true, enum: ["Cash", "Card", "UPI"] },
  },
  { timestamps: true }
);

const Lorry = mongoose.model("Lorry", lorrySchema);
export default Lorry;

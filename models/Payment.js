const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: "Contract", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  method: { type: String },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
  proposalId: { type: mongoose.Schema.Types.ObjectId, ref: "Proposal", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Active", "Completed"], default: "Active" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Contract", contractSchema);

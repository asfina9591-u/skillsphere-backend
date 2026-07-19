const User = require("../models/User");
const Gig = require("../models/Gig");
const Contract = require("../models/Contract");

// List All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// List All Gigs
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate("postedBy", "name email");
    res.json(gigs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Gig
exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json({ message: "Gig removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// List All Contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().populate("gigId proposalId clientId freelancerId");
    res.json(contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
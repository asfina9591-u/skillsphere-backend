const Contract = require("../models/Contract");

// Create Contract
const createContract = async (req, res) => {
  try {
    console.log("Contract route hit");

    const { gigId, proposalId, clientId, freelancerId } = req.body;

    const contract = new Contract({
      gigId,
      proposalId,
      clientId,
      freelancerId,
      status: "Active",
      startDate: new Date()
    });

    await contract.save();
    res.status(201).json({ message: "Contract Created", contract });
  } catch (err) {
    console.error("Error creating contract:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Contracts
const getContracts = async (req, res) => {
  try {
    console.log("Get Contracts route hit");

    const contracts = await Contract.find({})
      .populate("gigId", "title")
      .populate("clientId", "name")
      .populate("freelancerId", "name");

    res.json(contracts);
  } catch (err) {
    console.error("Error fetching contracts:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createContract, getContracts };
const express = require("express");
const router = express.Router();
const { createContract, getContracts } = require("../controllers/contractController");
const protect = require("../middleware/authMiddleware");

// Create Contract
router.post("/", protect, createContract);

// Get Contracts
router.get("/", protect, getContracts);

module.exports = router;

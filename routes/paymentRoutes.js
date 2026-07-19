const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/paymentController");
const protect = require("../middleware/authMiddleware");

// POST /api/payments
router.post("/", protect, makePayment);

module.exports = router;

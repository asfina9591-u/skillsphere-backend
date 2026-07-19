const express = require("express");
const router = express.Router();
const { freelancerDashboard, clientDashboard } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

// Freelancer Dashboard
router.get("/freelancer", protect, freelancerDashboard);

// Client Dashboard
router.get("/client", protect, clientDashboard);

module.exports = router;

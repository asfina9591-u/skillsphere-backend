const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware"); // fix: correct filename

router.post("/", protect, addReview);
router.get("/:userId", getReviews);

module.exports = router;
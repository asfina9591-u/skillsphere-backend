const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createReview, getReviews } = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware");

// POST / - Create a new review (protected + validated)
router.post(
  "/",
  protect,
  [
    check("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    check("comment")
      .notEmpty()
      .withMessage("Comment is required"),
    check("receiver")
      .isMongoId()
      .withMessage("Invalid receiver ID"),
    check("contract")
      .isMongoId()
      .withMessage("Invalid contract ID")
  ],
  createReview
);

// GET /:userId - Fetch reviews for a user (protected)
router.get("/:userId", protect, getReviews);

module.exports = router;
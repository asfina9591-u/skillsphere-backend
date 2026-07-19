const Review = require("../models/Review");
const { validationResult } = require("express-validator");

// Add Review
exports.addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { receiver, contract, rating, comment } = req.body;

    const review = new Review({
      reviewer: req.user._id || req.user.id,
      receiver,
      contract,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ success: true, message: "Review Added", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Reviews for a user
exports.getReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ receiver: userId })
      .populate("reviewer", "name email")
      .populate("contract");

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found" });
    }

    res.json({ success: true, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const Gig = require("../models/Gig");

// Create Gig
const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      postedBy: req.user.id
    });

    res.status(201).json({
      message: "Gig Created",
      gig
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Get All Gigs
const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find().populate("postedBy", "name email");
    res.json(gigs);
  } catch (err) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// Get My Gigs
const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ postedBy: req.user.id });
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Gig By Id
const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("postedBy", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search Gigs
const searchGigs = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const gigs = await Gig.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(gigs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createGig, getGigs, getMyGigs, getGigById, searchGigs };
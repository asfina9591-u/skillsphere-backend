const Proposal = require("../models/Proposal");
const Gig = require("../models/Gig");
const sendNotification = require("../utils/sendNotification");

// Apply Proposal
const applyProposal = async (req, res) => {
  try {
    const { gigId, bidAmount, message } = req.body;

    // Check if gig exists first
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ success: false, message: "Gig not found" });
    }

    // Check if freelancer already applied to this gig
    const existingProposal = await Proposal.findOne({
      gigId,
      freelancerId: req.user.id
    });

    if (existingProposal) {
      return res.status(400).json({ 
        success: false, 
        message: "You have already submitted a proposal for this gig" 
      });
    }

    // Create the proposal
    const proposal = await Proposal.create({
      gigId,
      freelancerId: req.user.id,
      bidAmount,
      message
    });

    // Notify the gig owner directly
    await sendNotification(
      gig.postedBy,
      "New Proposal Received",
      `You received a new proposal on your gig: ${gig.title}`
    );

    res.status(201).json({
      success: true,
      message: "Proposal Submitted",
      proposal
    });
  } catch (err) {
    console.error("Apply Proposal Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Proposals of a Gig (Client View)
const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ gigId: req.params.gigId })
      .populate("freelancerId", "name email");

    res.json({ success: true, proposals });
  } catch (err) {
    console.error("Get Proposals Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get My Bids (Freelancer View)
const getMyBids = async (req, res) => {
  try {
    const bids = await Proposal.find({ freelancerId: req.user.id })
      .populate("gigId", "title budget status");

    res.json({ success: true, bids });
  } catch (err) {
    console.error("Get My Bids Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Accept Bid (Client)
const acceptBid = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.bidId);

    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    proposal.status = "Accepted";
    await proposal.save();

    // Send direct notification to the freelancer
    await sendNotification(
      proposal.freelancerId,
      "Proposal Accepted",
      "Your proposal has been accepted!"
    );

    res.json({ success: true, message: "Bid Accepted", proposal });
  } catch (err) {
    console.error("Accept Bid Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Reject Bid (Client)
const rejectBid = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(
      req.params.bidId,
      { status: "Rejected" },
      { new: true }
    );

    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    // Send direct notification to the freelancer
    await sendNotification(
      proposal.freelancerId,
      "Proposal Rejected",
      "Your proposal was not selected for this gig."
    );

    res.json({ success: true, message: "Bid Rejected", proposal });
  } catch (err) {
    console.error("Reject Bid Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  applyProposal,
  getProposals,
  getMyBids,
  acceptBid,
  rejectBid
};
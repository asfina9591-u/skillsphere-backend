const Proposal = require("../models/Proposal");
const Gig = require("../models/Gig");
const sendNotification = require("../utils/sendNotification");

// Apply Proposal
const applyProposal = async (req, res) => {
  try {
    const { gigId, bidAmount, message } = req.body;

    const proposal = await Proposal.create({
      gigId,
      freelancerId: req.user.id,
      bidAmount,
      message
    });

    const gig = await Gig.findById(gigId);
    if (gig) {
      await sendNotification(
        gig.postedBy,
        "New Proposal Received",
        `You received a new proposal on your gig: ${gig.title}`
      );
    }

    res.status(201).json({
      success: true,
      message: "Proposal Submitted",
      proposal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Proposals of a Gig
const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ gigId: req.params.gigId })
      .populate("freelancerId", "name email");

    res.json({ success: true, proposals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get My Bids (Freelancer)
const getMyBids = async (req, res) => {
  try {
    const bids = await Proposal.find({ freelancerId: req.user.id });
    res.json({ success: true, bids });
  } catch (err) {
    console.error(err);
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

    await sendNotification(
      proposal.freelancerId,
      "Proposal Accepted",
      `Your proposal has been accepted!`
    );

    res.json({ success: true, message: "Bid Accepted", proposal });

  } catch (err) {
    console.error("Accept Bid Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Reject Bid (Client)
const rejectBid = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.bidId, { status: "Rejected" });

    if (!proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    res.json({ success: true, message: "Bid Rejected" });
  } catch (err) {
    console.error(err);
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
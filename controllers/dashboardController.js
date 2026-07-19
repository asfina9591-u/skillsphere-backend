const Contract = require("../models/Contract");
const Proposal = require("../models/Proposal");
const Review = require("../models/Review");
const Gig = require("../models/Gig");
const Payment = require("../models/Payment");

// Freelancer Dashboard
const freelancerDashboard = async (req, res) => {
  try {
    const freelancerId = req.user._id;

    const earnings = await Payment.aggregate([
      { $match: { freelancerId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const activeContracts = await Contract.countDocuments({ freelancerId, status: "Active" });
    const completedProjects = await Contract.countDocuments({ freelancerId, status: "Completed" });
    const pendingProposals = await Proposal.countDocuments({ freelancerId, status: "Pending" });
    const latestReviews = await Review.find({ receiver: freelancerId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalEarnings: earnings[0]?.total || 0,
      activeContracts,
      completedProjects,
      pendingProposals,
      latestReviews
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Client Dashboard
const clientDashboard = async (req, res) => {
  try {
    const clientId = req.user._id;

    const totalGigs = await Gig.countDocuments({ postedBy: clientId });
    const activeContracts = await Contract.countDocuments({ clientId, status: "Active" });
    const pendingProposals = await Proposal.countDocuments({ clientId, status: "Pending" });
    const totalPayments = await Payment.aggregate([
      { $match: { clientId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const recentHires = await Contract.find({ clientId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalGigs,
      activeContracts,
      pendingProposals,
      totalPayments: totalPayments[0]?.total || 0,
      recentHires
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { freelancerDashboard, clientDashboard };

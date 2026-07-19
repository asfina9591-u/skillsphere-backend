const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  applyProposal,
  getProposals,
  getMyBids,
  acceptBid,
  rejectBid
} = require("../controllers/proposalController");

router.post("/", protect, applyProposal);
router.get("/gig/:gigId", protect, getProposals);
router.get("/mybids", protect, getMyBids);
router.put("/accept/:bidId", protect, acceptBid);
router.put("/reject/:bidId", protect, rejectBid);

module.exports = router;

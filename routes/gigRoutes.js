console.log("Gig Routes Loaded");
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createGig,
  getGigs,
  getMyGigs,
  getGigById,
  searchGigs,
} = require("../controllers/gigController");

router.post("/", protect, createGig);
router.get("/", protect, getGigs);
router.get("/mygigs", protect, getMyGigs);
router.get("/search", searchGigs);

console.log("Registering GET /:id route");
router.get("/:id", (req, res, next) => {
  console.log("Gig ID Route Hit:", req.params.id);
  next();
}, getGigById);

module.exports = router;
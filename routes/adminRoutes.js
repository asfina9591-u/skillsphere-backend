const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const {
  getAllUsers,
  deleteUser,
  getAllGigs,
  deleteGig,
  getAllContracts,
} = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.get("/gigs", protect, isAdmin, getAllGigs);
router.delete("/gigs/:id", protect, isAdmin, deleteGig);
router.get("/contracts", protect, isAdmin, getAllContracts);

module.exports = router;
console.log("THIS IS MY SERVER");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const gigRoutes = require("./routes/gigRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const contractRoutes = require("./routes/contractRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files (images, resumes, etc.)
app.use("/uploads", express.static("uploads"));

// Authentication Routes
app.use("/api/auth", authRoutes);

// Profile Routes
app.use("/api", profileRoutes);

// Gig Routes
app.use("/api/gigs", gigRoutes);

// Proposal Routes (bids)
app.use("/api/proposals", proposalRoutes);

// Contract Routes
app.use("/api/contracts", contractRoutes);

// Payment Routes
app.use("/api/payments", paymentRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// User Routes (search etc.)
app.use("/api/users", userRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Review Routes
app.use("/api/reviews", reviewRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SkillSphere Backend Running...");
});

// Protected Test Route (optional quick check)
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});

process.on("exit", (code) => {
  console.log("PROCESS EXITED:", code);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("REJECTION:", err);
});
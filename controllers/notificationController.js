const Notification = require("../models/Notification");

/**
 * 1. Internal Helper Function
 * Call this directly inside other controllers (e.g., proposalController, gigController)
 * Example: await createNotification(gig.postedBy, "New Bid", "Someone applied to your gig", "proposal");
 */
const createNotification = async (userId, title, message, type = "info") => {
  try {
    // Falls back to match whichever field your schema uses (user or userId)
    await Notification.create({ 
      user: userId, 
      userId: userId, 
      title, 
      message, 
      type 
    });
  } catch (err) {
    console.error("Internal Notification creation failed:", err);
  }
};

/**
 * 2. API Route Controller: Create Notification via HTTP Request
 * POST /api/notifications
 */
const createNotificationAPI = async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;
    
    if (!userId || !title || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const notification = await Notification.create({
      user: userId,
      userId: userId,
      title,
      message,
      type: type || "info"
    });

    res.status(201).json({ success: true, notification });
  } catch (err) {
    console.error("API Notification creation failed:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * 3. API Route Controller: Get all notifications for the logged-in user
 * GET /api/notifications
 */
const getNotifications = async (req, res) => {
  try {
    const currentUserId = req.user?._id || req.user?.id;
    if (!currentUserId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found in request" });
    }

    // Finds notifications using either 'user' or 'userId' keys based on your model configuration
    const notifications = await Notification.find({
      $or: [{ user: currentUserId }, { userId: currentUserId }]
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

/**
 * 4. API Route Controller: Mark a specific notification as read
 * PUT /api/notifications/:id/read
 */
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.json({ success: true, message: "Notification marked as read", notification });
  } catch (err) {
    console.error("Error updating notification status:", err);
    res.status(500).json({ success: false, message: err.message || "Server Error" });
  }
};

module.exports = { 
  createNotification,       // For internal server-side use
  createNotificationAPI,    // For HTTP POST route
  getNotifications,         // For HTTP GET route
  markAsRead                // For HTTP PUT route
};
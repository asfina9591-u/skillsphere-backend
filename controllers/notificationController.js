const Notification = require("../models/Notification");

// Helper function — call this from other controllers
const createNotification = async (userId, title, message, type) => {
  try {
    await Notification.create({ user: userId, title, message, type });
  } catch (err) {
    console.error("Notification creation failed:", err);
  }
};

// Get all notifications for logged-in user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id || req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Mark a notification as read
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
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createNotification, getNotifications, markAsRead };
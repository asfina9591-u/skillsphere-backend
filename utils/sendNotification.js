const Notification = require("../models/Notification");

const sendNotification = async (userId, title, message, type = "proposal") => {
  try {
    await Notification.create({
      user: userId,
      title,
      message,
      type,
    });
  } catch (err) {
    console.error("Notification Error:", err);
  }
};

module.exports = sendNotification;
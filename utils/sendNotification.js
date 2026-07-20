const sendNotification = async (userId, title, message, type = "proposal") => {
  try {
    await Notification.create({
      userId: userId,   // ✅ matches schema field name
      title,
      message,
      type,
    });
  } catch (err) {
    console.error("Notification Error:", err);
  }
};

module.exports = sendNotification;
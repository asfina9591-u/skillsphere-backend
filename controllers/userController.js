const User = require("../models/User");

// Search Users by Skill
exports.searchUsers = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }

    const users = await User.find({
      skills: { $regex: skill, $options: "i" }
    }).select("-password");

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
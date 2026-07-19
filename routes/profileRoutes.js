const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");

// Upload Profile Picture
router.put(
  "/profile/upload",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    console.log("==========UPLOAD==========");
    console.log("Headers:", req.headers["content-type"]);
    console.log("File:", req.file);
    console.log("Body:", req.body);

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user.id);
      user.profilePic = "/uploads/" + req.file.filename;
      await user.save();

      res.json({
        message: "Profile Picture Updated",
        profilePic: user.profilePic,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

module.exports = router;
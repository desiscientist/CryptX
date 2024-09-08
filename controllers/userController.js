const User = require("../models/User");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

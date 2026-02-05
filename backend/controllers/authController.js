
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.json({ message: "Signup successful", user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "User Not Found" });

res.json({
  message: "Login successful",
  userId: user._id,
  role: user.role   // 👈 VERY IMPORTANT
});

};


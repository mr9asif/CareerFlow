const User = require("../models/User")

exports.createUser = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { email, telegramId, skills, interests } = req.body;

    const user = new User({
      email,
      telegramId,
      skills,
      interests,
    });

    const savedUser = await user.save();

    console.log("Saved user:", savedUser);

    res.json({ message: "User saved ✅", data: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
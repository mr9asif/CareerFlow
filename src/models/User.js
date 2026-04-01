const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telegramId: String,

  skills: [String],
  interests: [String],

  experienceLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },

  goals: [String], // e.g. ["get a job", "learn AI"]

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  company: {
    type: String,
  },

  skillsRequired: [String], // for matching with user.skills

  experienceLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },

  applyLink: {
    type: String,
    required: true,
    unique: true, // 🔥 prevents duplicate jobs
  },

  source: {
    type: String, // LinkedIn, Indeed, etc.
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 3, // ⏳ auto delete after 3 days
  },
});

module.exports = mongoose.model("Job", jobSchema);


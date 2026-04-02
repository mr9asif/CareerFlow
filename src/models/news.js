const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true, // AI-generated short summary
  },

  tags: [String], // for matching with user.interests

  url: {
    type: String,
    required: true,
    unique: true, // avoid duplicate news
  },

  source: {
    type: String,
  },

  publishedAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 2, // ⏳ auto delete after 2 days
  },
});

module.exports = mongoose.model("News", newsSchema);
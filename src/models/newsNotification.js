const mongoose = require("mongoose");

const newsNotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],

  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewsNotification", newsNotificationSchema);
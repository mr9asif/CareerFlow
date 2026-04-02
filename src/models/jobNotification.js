const mongoose = require("mongoose");

const jobNotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobNotification", jobNotificationSchema);
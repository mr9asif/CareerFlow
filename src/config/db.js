const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅", mongoose.connection.name);
  } catch (err) {
    console.error("DB error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
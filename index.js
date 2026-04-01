require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db")

const app = express();

// connect DB
connectDB();


app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
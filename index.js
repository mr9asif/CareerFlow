require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db")
const userRoutes = require("./src/routes/userRoutes")

const app = express();
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api", userRoutes);


app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
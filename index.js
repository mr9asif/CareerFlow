require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db")
const userRoutes = require("./src/routes/userRoutes")
const newsRoutes = require("./src/routes/newsRoutes");
const {fetchNews} = require("./src/services/newsFetcher")

const app = express();
app.use(express.json());

// connect DB
connectDB();

// console.log("userRoutes:", userRoutes);
// routes
app.use("/api", userRoutes);
app.use("/api/news", newsRoutes);
const run = async () => {
  const news = await fetchNews();

  news.forEach((item, index) => {
    console.log(`\n📰 ${index + 1}. ${item.title}`);
    console.log(`🔗 ${item.url}`);
    console.log(`📅 ${item.publishedAt}`);
  });
};

// run();

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
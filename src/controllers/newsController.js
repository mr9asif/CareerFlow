const News = require("../models/news");
const { newsFetcher } = require("../services/newsFetcher");

// 📥 Fetch + store news manually (optional trigger)
const fetchNews = async (req, res) => {
  try {
    await newsFetcher();
    res.status(200).json({ message: "News fetched and stored successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📤 Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📤 Get single news by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Filter by tag (for personalization later)
const getNewsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    const news = await News.find({ tags: tag })
      .sort({ createdAt: -1 });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchNews,
  getAllNews,
  getNewsById,
  getNewsByTag,
};
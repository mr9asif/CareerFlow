const mongoose = require("mongoose");
const News = require("../models/news");
const { newsFetcher } = require("../services/newsFetcher");

// 📥 Fetch + store news manually (trigger)
const triggerFetchNews = async (req, res) => {
  try {
    const result = await newsFetcher(); // optional return info
    res.status(200).json({
      message: "News fetched and stored successfully",
      count: result?.length || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📤 Get all news (with pagination)
const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📤 Get single news by ID (safe)
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Prevent crash on invalid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Filter by tag (case-insensitive + flexible)
const getNewsByTag = async (req, res) => {
  try {
    const { tag } = req.params;

    const news = await News.find({
      tags: { $regex: tag, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  triggerFetchNews,
  getAllNews,
  getNewsById,
  getNewsByTag,
};
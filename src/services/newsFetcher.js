const Parser = require("rss-parser");
const News = require("../models/news");

const parser = new Parser();

const newsFetcher = async () => {
  try {
    const feed = await parser.parseURL("https://techcrunch.com/feed/");

    if (!feed.items) return [];

    const newsData = feed.items.slice(0, 20).map(item => ({
      title: item.title,
      description: item.contentSnippet || item.content || "",
      url: item.link,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : null,
      source: feed.title || "TechCrunch",
      tags: [], // optional for now
    }));

    // ✅ SAVE TO DB (IMPORTANT PART)
    for (const item of newsData) {
      await News.updateOne(
        { url: item.url },   // prevent duplicates
        item,
        { upsert: true }
      );
    }

    return newsData;
  } catch (error) {
    console.error("❌ RSS fetch error:", error.message);
    return [];
  }
};

module.exports = { newsFetcher };
const Parser = require("rss-parser");

const parser = new Parser();

const newsFetcher = async () => {
  try {
    const feed = await parser.parseURL(
      "https://techcrunch.com/feed/"
    );

    return feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      url: item.link,
      publishedAt: item.pubDate,
      source: "TechCrunch",
    }));
  } catch (error) {
    console.error("❌ RSS fetch error:", error.message);
    return [];
  }
};

module.exports = { newsFetcher };
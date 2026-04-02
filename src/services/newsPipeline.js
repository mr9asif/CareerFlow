const News = require("../models/News");
const { fetchNews } = require("./newsFetcher");
const { summarizeNews } = require("./newsProcessor");
const { extractTags } = require("./tagExtractor");

const fetchAndStoreNews = async () => {
  const articles = await fetchNews();

  for (const a of articles.slice(0, 20)) {
    try {
      const summary = summarizeNews(a.description);
      const tags = extractTags(a.title + " " + a.description);

      await News.create({
        title: a.title,
        summary,
        tags,
        url: a.url,
        source: a.source,
        publishedAt: a.publishedAt,
      });
    } catch (err) {
      // ignore duplicates
    }
  }

  console.log("✅ Free news stored");
};

module.exports = { fetchAndStoreNews };
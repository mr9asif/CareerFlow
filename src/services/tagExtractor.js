const TECH_KEYWORDS = [
  "AI",
  "JavaScript",
  "Node",
  "React",
  "Python",
  "Machine Learning",
  "Startup",
  "Cloud",
  "API",
  "Database",
];

const extractTags = (text) => {
  if (!text) return [];

  const lower = text.toLowerCase();

  return TECH_KEYWORDS.filter(keyword =>
    lower.includes(keyword.toLowerCase())
  );
};

module.exports = { extractTags };
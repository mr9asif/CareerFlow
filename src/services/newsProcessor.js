const summarizeNews = (text) => {
  if (!text) return "";

  // simple clean + trim
  return text.split(".").slice(0, 2).join(".") + ".";
};

module.exports = { summarizeNews };
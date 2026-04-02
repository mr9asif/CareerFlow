const Job = require("../models/Job");
const axios = require("axios");

const fetchAndStoreJobs = async () => {
  const res = await axios.get("https://remotive.com/api/remote-jobs");

  const jobs = res.data.jobs;

  for (const j of jobs) {
    try {
      await Job.create({
        title: j.title,
        company: j.company_name,
        skillsRequired: j.tags,
        applyLink: j.url,
        source: "Remotive",
      });
    } catch (err) {
      // ignore duplicates
    }
  }
};

module.exports = { fetchAndStoreJobs };
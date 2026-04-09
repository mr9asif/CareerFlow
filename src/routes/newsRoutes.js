const express = require("express");
const router = express.Router();

const {
  triggerFetchNews,
  getAllNews,
  getNewsById,
  getNewsByTag,
} = require("../controllers/newsController");

// fetch + store
router.post("/fetch", triggerFetchNews);

// get all news
router.get("/", getAllNews);

// get by tag
router.get("/tag/:tag", getNewsByTag);

// get by id
router.get("/:id", getNewsById);

module.exports = router;
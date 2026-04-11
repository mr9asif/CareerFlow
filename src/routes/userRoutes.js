const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/UserController");

router.post("/user", createUser);

module.exports = router;

// to do check the job and news all get
/*
🚀 USER APIs
POST /api/user → create new user with skills, interests, email, telegramId
GET /api/user/:id → get user details
🧲 JOB APIs
POST /api/jobs/fetch → fetch latest jobs from external APIs and store in DB
GET /api/jobs → get all stored jobs (for testing/debug)
📰 NEWS APIs
POST /api/news/fetch → fetch latest news, summarize & store in DB
GET /api/news → get all stored news (for testing/debug)
🧠 RECOMMENDATION APIs (CORE)
GET /api/feed/:userId → get personalized jobs + news for a user
📬 NOTIFICATION APIs
POST /api/send/:userId → send email + telegram notifications to a specific user
⚙️ OPTIONAL (GOOD TO HAVE)
DELETE /api/jobs → clear old jobs from DB
DELETE /api/news → clear old news from DB
GET /api/users → get all users (for cron/testing)
🧩 HOW THEY CONNECT (SUPER SIMPLE)
/jobs/fetch → store jobs
/news/fetch → store news
/user → create user
/feed/:userId → match data
/send/:userId → deliver results

-----------------------------


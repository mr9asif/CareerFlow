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
✅ Correct Architecture
APIs = just triggers
Matching = happens internally
🔥 Specifically:
👉 This API:
GET /api/feed/:userId

👉 DOES:

get user data (skills, interests)
get jobs + news from DB
match them internally
return filtered results
👉 This API:
POST /api/send/:userId

👉 DOES:

get user
call matching logic (same as /feed)
send only matched jobs/news
🎯 So Where is Matching Actually Written?

👉 Inside:

recommendationService.js (or similar)

This is your brain

🧩 Flow (VERY CLEAR)
Step 1:

/api/jobs/fetch
→ store jobs in DB

Step 2:

/api/news/fetch
→ store news in DB

Step 3:

User exists with:

skills
interests
Step 4:

/api/feed/:userId

👉 internally:

compare:
user.skills ↔ job.skillsRequired
user.interests ↔ news.tags

👉 return matched results

Step 5:

/api/send/:userId

👉 internally:

same matching happens
then send email + telegram
⚠️ Important Understanding

❌ You do NOT create API like:

/match-jobs
/match-news

👉 That’s wrong design

✅ Correct Way

✔ Matching = internal function
✔ APIs = only entry points

🧠 Simple Analogy

Think like:

API = button
Matching logic = brain
DB = memory
Email/Telegram = output

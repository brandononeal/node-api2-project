const express = require("express");
const Post = require("../../data/db");

const router = express.Router();

// POST /api/posts
// POST /api/posts/:id/comments
// GET /api/posts
// GET /api/posts/:id
// GET /api/posts/:id/comments
// DELETE /api/posts/:id
// PUT /api/posts/:id

module.exports = router;

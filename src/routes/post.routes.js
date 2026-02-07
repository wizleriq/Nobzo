const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  updatePost,
  deletePost
} = require("../controllers/post.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.get("/", getPosts);

// Protected routes
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.put("/:id", authMiddleware, updatePost);


module.exports = router;

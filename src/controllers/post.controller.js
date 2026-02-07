const Post = require("../models/post.models");
const slugify = require("slugify");

//CREATE POST
const createPost = async (req, res) => {
  const slug = slugify(req.body.title, {
    lower: true,
    strict: true,
  });

   const existing = await Post.findOne({ slug });
  if (existing) {
    return res
      .status(400)
      .json({ message: "Post title already exists" });
  }

  const post = await Post.create({
    ...req.body,
    slug,
    author: req.user.id,
  });

  res.status(201).json(post);
};

// GET PUBLIC POSTS
const getPosts = async (req, res) => {
  const { page = 1, limit = 10, search, tag, author } = req.query;

  const query = {
    status: "published",
    deletedAt: null,
  };

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") },
    ];
  }

  if (tag) query.tags = tag;
  if (author) query.author = author;

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("author", "name");

  res.json(posts);
};

// UPDATE POST (AUTHOR ONLY)
const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, deletedAt: null });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Update allowed fields
    const { title, content, tags, status } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    if (status) post.status = status;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
;
// SOFT DELETE POST (AUTHOR ONLY)
const deletePost = async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
    deletedAt: null,
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  post.deletedAt = new Date();
  await post.save();

  res.json({ message: "Post deleted" });
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};

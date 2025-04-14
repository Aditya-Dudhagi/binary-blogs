const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");
const verifyToken = require("../middleware/verifyToken");

// fetches all blog posts
router.get("/", async (req, res) => {
  try {
    console.log("🔍 Fetching posts...");
    // Get page and limit from query params, or use defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // fetch blogs with pagination
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // optional: newest first
      .skip(skip)
      .limit(limit)
      .populate("author", "username");

    //   count total documents (for frontend to show total pages)
    const total = await Blog.countDocuments();

    console.log("✅ Posts fetched:");
    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalBlogs: total,
      blogs,
    });
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ message: "Server error while fetching posts." });
  }
});


// post a blog
router.post("/", verifyToken, async (req, res) => {
  // 1. extract data from request body
  const { title, content } = req.body;

  // 2. validate input
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  // 3. create a new blog post object with the author
  const newPost = new Blog({
    title,
    content,
    author: req.user.id, //added by verifyToken middleware
  });

  // 4. Save to mongoDB and respond
  const savedPost = await newPost.save();
  res.status(201).json(savedPost);
});

// Update the blog post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // 1. find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // check if logged-in user is the auther
    if (blog.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own posts" });
    }

    // update the post
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete a blog post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    // const blog = await Blog.findOne(req.params.id );
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // check if the logged-in user is the author
    if (blog.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await blog.deleteOne();

    // const result = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

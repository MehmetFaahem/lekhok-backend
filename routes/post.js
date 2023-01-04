const express = require("express");
const router = express.Router();

const BlogSchema = require("../models/blog");

router.post("/", async (req, res) => {
  try {
    const blog = new BlogSchema({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });
    await blog.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await BlogSchema.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

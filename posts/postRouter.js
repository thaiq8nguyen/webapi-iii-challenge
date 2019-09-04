const express = require("express");
const { get, getById, update, remove } = require("../posts/postDb");
const validatePostID = require("../middleware/validatePostID");
const validatePost = require("../middleware/validatePost");
const router = express.Router();

// get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await get();
    res.json({ error: false, posts: posts });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "Unable to retrieve blog posts" });
  }
});

// get a specific blog post by id
router.get("/:id", validatePostID, async (req, res) => {
  try {
    const post = await getById(req.post.id);
    res.json({ error: false, post: post });
  } catch (errors) {
    res
      .status(500)
      .json({ error: false, message: "Unable to retrieve the blog post" });
  }
});

// delete a blog post by id
router.delete("/:id", validatePostID, async (req, res) => {
  try {
    const row = await remove(req.params.id);
    res.json({ error: false, message: "The blog post has been deleted." });
  } catch {
    res
      .status(500)
      .json({ error: true, message: "Unable to delete the blog post." });
  }
});

//update a blog post by id and new content
router.put("/:id", [validatePostID, validatePost], async (req, res) => {
  try {
    const row = await update(req.params.id, req.body);
    const post = await getById(req.params.id);
    res.json({ error: false, post: post });
  } catch {
    res
      .status(500)
      .json({ error: true, message: "Unable to update the blog post." });
  }
});

module.exports = router;

const express = require("express");
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove
} = require("./userDb");
const { insertPost } = require("../posts/postDb");
const validateUserID = require("../middleware/validateUserID");
const validateUser = require("../middleware/validateUser");
const validatePost = require("../middleware/validatePost");
const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const user = await insert(req.body);
    const newUser = await getById(user.id);

    res.status(201).json({ error: false, user: newUser });
  } catch (errors) {
    res.status(500).json({ error: true, message: errors });
  }
});

router.post("/:id/posts", [validateUserID, validatePost], async (req, res) => {
  try {
    const post = await insertPost({
      user_id: req.params.id,
      text: req.body.text
    });
    res.status(201).json({ error: false, post: post });
  } catch (errors) {
    res.status(500).json({
      error: true,
      message: "Unable to create the post for the user."
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await get();

    res.json({ error: false, users: users });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "Cannot retrieved all users" });
  }
});

router.get("/:id", validateUserID, async (req, res) => {
  res.json({ error: false, user: req.user });
});

router.get("/:id/posts", validateUserID, async (req, res) => {
  try {
    const posts = await getUserPosts(req.user.id);

    res.json({ error: false, posts: posts });
  } catch (errors) {
    res
      .status(500)
      .json({ error: true, message: "Unable to retrieve the user posts." });
  }
});

router.delete("/:id", validateUserID, async (req, res) => {
  try {
    const user = await remove(req.user.id);
    if (user === 1) {
      res.json({ error: false, message: "The user has been deleted." });
    }
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to delete user" });
  }
});

router.put("/:id", validateUserID, async (req, res) => {
  try {
    const user = await update(req.user.id, req.body);
    const updated = await getById(req.user.id);
    res.json({ error: false, user: updated });
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to update user." });
  }
});

module.exports = router;

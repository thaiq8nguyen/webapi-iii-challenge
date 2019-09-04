const { getById } = require("../posts/postDb");
const validatePostID = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await getById(id);
    if (!post) {
      res.status(400).json({ error: true, message: "Invalid blog post id" });
    } else {
      req.post = post;
      next();
    }
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to verify post id" });
  }
};

module.exports = validatePostID;

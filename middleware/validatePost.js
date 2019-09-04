const validatePost = (req, res, next) => {
  if (Object.keys(req.body).length) {
    if (req.body.text) {
      next();
    } else {
      res
        .status(400)
        .json({ error: true, message: "Missing require text field" });
    }
  } else {
    res.status(400).json({ error: true, message: "Missing post data" });
  }
};

module.exports = validatePost;

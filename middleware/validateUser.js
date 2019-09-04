const validateUser = (req, res, next) => {
  if (Object.keys(req.body).length) {
    if (req.body.name) {
      next();
    } else {
      res
        .status(400)
        .json({ error: true, message: "Missing require name field" });
    }
  } else {
    res.status(400).json({ error: true, message: "Missing user data" });
  }
};

module.exports = validateUser;

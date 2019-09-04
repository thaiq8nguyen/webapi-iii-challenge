const { getById } = require("../users/userDb");

const validateUserID = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await getById(id);
    if (!user) {
      res.status(400).json({ error: true, message: "Invalid user id" });
    } else {
      req.user = user;
      next();
    }
  } catch (errors) {
    res.status(500).json({ error: true, message: "Unable to verify use id" });
  }
};

module.exports = validateUserID;

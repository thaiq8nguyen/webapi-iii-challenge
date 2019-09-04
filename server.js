const express = require("express");
const logger = require("./middleware/logger");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const PORT = process.env.PORT;
const server = express();
server.use(express.json());

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

// MOTD
server.use("/motd", (req, res) => {
  res.json({ message: process.env.MOTD });
});

server.listen(PORT, () => {
  console.log(`--Server is listening on ${PORT}--`);
});

module.exports = server;

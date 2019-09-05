const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("./middleware/logger");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const PORT = process.env.PORT;
const server = express();
server.use(express.json());
//server.use(cors());
//server.use(express.static(path.join(__dirname, "client/public")));

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

server.listen(PORT, () => {
  console.log(`--Server is listening on ${PORT}--`);
});

module.exports = server;

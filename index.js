// code away!
const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const PORT = 9000;
const app = express();
app.use(express.json());

app.use("/api", logger, userRouter);
app.use("/api", logger, postRouter);

app.listen(PORT, () => {
  console.log(`--Server is listening on ${PORT}--`);
});

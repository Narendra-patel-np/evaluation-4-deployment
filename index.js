const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/posts.routes");
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db.");
    console.log("Server is running at port 4500");
  } catch (err) {
    console.log(err);
  }
});

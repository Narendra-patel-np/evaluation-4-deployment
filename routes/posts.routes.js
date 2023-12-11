const express = require("express");
const { PostModel } = require("../model/post.model");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const postRouter = express.Router();

postRouter.post("/add", auth, async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "new Post has been added" });
  } catch (error) {
    res.status(400).send({ error });
  }
});
postRouter.get("/", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error });
  }
});
postRouter.patch("/update/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postId });
    console.log(post);
    if (req.body.userID === post.userID) {
      await PostModel.findByIdAndUpdate({ _id: postId }, req.body);
      res.status(200).send({ msg: `Post with id ${postId} has been updated` });
    } else {
      res.status(200).send({ msg: "You are not authorized." });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});
postRouter.delete("/delete/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postId });
    if (req.body.userID === post.userID) {
      await PostModel.findByIdAndDelete({ _id: postId });
      res.status(200).send({ msg: `Post with id ${postId} has been deleted` });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = {
  postRouter,
};

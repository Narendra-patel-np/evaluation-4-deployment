const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", (req, res) => {
  try {
    const { name, email, gender, password } = req.body;
    bcrypt.hash(password, 5, async (error, hash) => {
      if (error) {
        res.status(200).send({ error });
      }
      const user = new UserModel({ name, email, gender, password: hash });
      await user.save();
      res.status(200).send({ msg: "A new user has been registered." });
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, username: user.email },
          "masai"
        );
        res.status(200).send({ msg: "Login Successfull", token });
      } else {
        res.status(200).send({ msg: "wrong credentials!" });
      }
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = {
  userRouter,
};

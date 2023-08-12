const express = require("express");
const UserModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { blackList } = require("../blackList");
const userRouter = express.Router();

// Register
userRouter.post("/register", async (req, res) => {
  try {
    const { username, age, email, pass } = req.body;
    bcrypt.hash(pass, 5, async (errs, hash) => {
      if (errs) {
        res.send({ errs: errs });
      } else {
        const user = new UserModel({ username, age, email, pass: hash });
        await user.save();
        res.status(200).send({ msg: "new user has registerd" });
      }
    });
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "node" }, "masai", { 
            expiresIn: 30,
          });
          res.status(200).send({ mgs: "Login Successfull ", token: token });
        } else {
          res.send({ msg: "wrong Password" });
        }
      });
    } else {
      res.status(200).send({ mgs: "Wrong Email " });
    }
  } catch (error) {
    res.status(400).send({ err: error });
  }
});

userRouter.get("/logout", (req, res) => {
  const token = req.headers.authorization;

  try {
    blackList.push(token);
    res.send({ msg: "The user has been loged out" });
  } catch (error) {
    res.send({ err: error });
  }
});
module.exports = { userRouter };

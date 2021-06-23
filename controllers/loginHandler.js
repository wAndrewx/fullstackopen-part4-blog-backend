const login = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

login.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    if (body.username.length < 1 || body.password.length < 1) {
      return res.json({ error: "No credentials given" });
    }

    const getUser = await User.findOne({ username: req.body.username });
    const correctPassword = await bcrypt.compare(
      //here
      body.password,
      getUser.passwordHash
    );
    if (!getUser || !correctPassword) {
      return res.json({ error: "Wrong Credentials" });
    }

    const userToken = {
      username: getUser.username,
      id: getUser._id,
    };

    const token = jwt.sign(userToken, process.env.SECRET);
    return res.send({ token, username: body.username });
  } catch (err) {
    return res.send("Something wrong");
  }
});

module.exports = login;

const login = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

login.post("/", async (req, res, next) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({ message: "No credentials given" });
  }

  const getUser = await User.findOne({ username: req.body.username });//here
  try {
      
    const correctPassword = await bcrypt.compare(//here
      body.password,
      getUser.passwordHash
    );
    if (!getUser || !correctPassword) {
        
      return res.status(400).send("Wrong Credentials");
    }

    const userToken = {
      username: getUser.username,
      id: getUser._id,
    };

    const token = jwt.sign(userToken, process.env.SECRET);
    return res.send({ token, username: body.username });
  } catch (err) {
    return res.send("Somethingwong");
  }
});

module.exports = login;

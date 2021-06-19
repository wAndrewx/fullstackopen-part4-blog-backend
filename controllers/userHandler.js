const User = require("../models/user");
const Blog = require("../models/blog");
const userRoute = require("express").Router();
const bcrypt = require("bcryptjs");

userRoute.get("/", async (req, res, next) => {
  let users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  }); // populate the property
  res.send(users);
});

userRoute.post("/", async (req, res, next) => {
  const body = req.body;
  const existingUser = await User.find({ username: body.username });
  console.log(existingUser);
  if (existingUser.length != 0) {
    return res.status(400).send("Existing user choose a different username");
  }

  if (!body.password || body.password.length < 3) {
    return res.status(400).send("Password is too short");
  }

  if (body.username < 3) {
    return res.status(400).send("Username is too short");
  }

  const getBlog = await Blog.findById(body.id);

  const passwordHash = await bcrypt.hash(body.password, 10);
  const userObj = {
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
    blogs: getBlog._id,
  };
  const newUser = new User(userObj);
  return res.send(await newUser.save());
});

module.exports = userRoute;

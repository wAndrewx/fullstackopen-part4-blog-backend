const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
blogRouter.get("/", async (request, response) => {
  const getBlogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(getBlogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const verify = req.user;

  if (!verify) {
    return res.status(400).send("No Token m8 or user invalid");
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const blogSave = await blog.save();
    user.blogs = user.blogs.concat(blogSave.id);
    await user.save();
    return res.status(201).send("SUCCESS");
  } catch (error) {
    return res.status(400).send("FAIL");
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  const getBlogUser = await Blog.findById(req.params.id);
  const verify = req.user;
  console.log(verify);

  if (!verify) {
    return res.status(400).send("Not a verified user");
  }

  if (getBlogUser.user.toString() !== verify._id.toString()) {
    return res.status(400).send("This is not your blog");
  }

  try {
    await Blog.findOneAndDelete({ id: req.params.id });
    res.send(200).json({ message: "success" });
  } catch (err) {
    res.status(400);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
    let newLikes = { likes: req.body.likes };
    await Blog.findByIdAndUpdate(String(req.params.id), newLikes);
    res.status(200).send("yeah dawg u updated the likes");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = blogRouter;

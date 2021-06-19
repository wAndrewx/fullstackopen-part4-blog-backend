const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const api = supertest(app);
// require("jest");
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of blogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("GET /blogs", () => {
  test("is successful", async () => {
    let res = await api.get("/api/blogs");
    expect(res.body.length).toBe(blogs.length);

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

test("making sure each blog has a unique id property in server", async () => {
  let res = await api.get("/api/blogs");
  let jsonBody = res.body;
  // console.log(jsonBody);
  jsonBody.map((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("creating blog post works on server", async () => {
  let initBlogLength = blogs.length;

  const testblog = {
    title: "Title",
    author: "Andrew",
    url: "Andrew.com",
    likes: 2932,
  };
  await api.post("/api/blogs").send(testblog);
  let res = await api.get("/api/blogs");
  expect(res.body.length).toBe(initBlogLength + 1);
});

test("if no likes were provided to send to server then default value is 0", async () => {
  const testblog = {
    title: "Title",
    author: "Andrew",
    url: "Andrew.com",
  };
  await api.post("/api/blogs").send(testblog);
  let res = await api.get("/api/blogs").expect(200);
  // console.log(res.body);
  expect(res.body[6].likes).toBeDefined();
});

test("no new blog can be added if there is no url & title provided in request", async () => {
  const testblog = {
    author: "Andrew",
    likes: 2932,
  };
  await api.post("/api/blogs").send(testblog).expect(400);
  // let res = await api.get("/api/blogs").expect(400);
});

// test("returns the total likes -> 36", () => {
//   const out = listHelper.totalLikes(blogs);
//   expect(out).toBe(36);
// });

// test("returns the most likes -> 7", () => {
//   const out = listHelper.favoriteBlog(blogs);
//   expect(out).toEqual({
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     likes: 12,
//   });
// });

// test("returns most blogs made by a single person", () => {
//   const out = listHelper.mostBlogs(blogs);
//   expect(out).toEqual({
//     author: "Robert C. Martin",
//     blogs: 3,
//   });
// });

// test("returns most likes a single person has", () => {
//   const out = listHelper.mostLikes(blogs);
//   expect(out).toEqual({
//     author: "Edsger W. Dijkstra",
//     likes: 17,
//   });
// });

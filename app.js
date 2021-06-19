const express = require("express");
const app = express();
const { userExtractor } = require("./utils/middleware");
const blogRoutes = require("./controllers/blogHandler");
const userRoutes = require("./controllers/userHandler");
const loginRoutes = require("./controllers/loginHandler");
const config = require("./utils/config");
const cors = require("cors");

const mongoose = require("mongoose");
const password = config.DB_PW;
const mongoUrl = `mongodb+srv://andrewadmin:${password}@cluster0.iiydq.mongodb.net/my_note_db?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
app.use(cors());
app.use(express.json());
// app.use(getToken);
app.use("/api/users", userRoutes);
app.use("/api/blogs", userExtractor, blogRoutes); // only use the middlewear in this route
app.use("/api/login", loginRoutes);

module.exports = app;

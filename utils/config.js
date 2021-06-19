require("dotenv").config();

const DB_PW = process.env.MONGO_DB;
const PORT = 3003;

module.exports = {
  DB_PW,
  PORT,
};

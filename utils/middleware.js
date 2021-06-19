const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const getToken = (req, res, next) => {
//   const authHeader = req.get("authorization");

//   next();
//   if (authHeader) {
//     return (req.token = authHeader);
//   } else {
//     return (req.token = null);
//   }
// };

const userExtractor = async (req, res, next) => {
  const token = await req.get("authorization");
  const verify = jwt.verify(token, process.env.SECRET);
  const getUser = await User.findById(verify.id);
  if (!token) {
    return (req.user = null);
  }

  next();
  if (getUser) {
    return (req.user = getUser);
  } else {
    return (req.user = null);
  }
};

module.exports = { userExtractor }; //getToken,

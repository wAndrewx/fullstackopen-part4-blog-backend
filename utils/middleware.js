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
  try {
    const token = await req.get("Authorization");
    const verify = jwt.verify(token, process.env.SECRET);
    const getUser = await User.findById(verify.id);
    if (!token) {
      req.user = null;
      next();
    }

    if (getUser) {
      console.log("success");

      req.user = getUser;
      next();
    } else {
      req.user = null;
      next();
    }
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = { userExtractor }; //getToken,

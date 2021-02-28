const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
  const cookie = req.cookies.jwtToken;

  if (!cookie) {
  req.flash("warning_msg", "You need to log in to view this page.")
  res.redirect("/user/login");
  }
  const validUser = jwt.verify(cookie, process.env.SECRET_KEY);

  if (validUser) {
    req.user = validUser;
  }
  next();
};

module.exports = verifyUser;
const jwt = require("jsonwebtoken");
var config = require("./database");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send("em không có token sao xem được");
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.send("sai token ròi em");
  }
};
module.exports = checkToken;
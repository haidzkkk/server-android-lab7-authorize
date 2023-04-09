var express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const config = require('../config/database')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user');
const user = require('../models/user');

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database)

router.post('/', async (req, res) => {
  let userLogin = await userModel.findOne({ username: req.body.username });
  if (!userLogin) {
    res.send("account does not exist")
  } else {
    userLogin.comparePassword(req.body.password, function (err, isMatch) {
      if (!err && isMatch) {
        var token = jwt.sign({ user: userLogin }, config.secret, { expiresIn: "1h", });
        res.cookie("token", token, { maxAge: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect("/");
      } else {
        res.send("password is wrong")
      }
    })
  }
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login');
});

module.exports = router;

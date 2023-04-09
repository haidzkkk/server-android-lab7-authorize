var express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const config = require('../config/database')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user');
const bookModel = require('../models/book')
const checkToken = require('../config/Passport')

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database)

/* GET users listing. */
router.get('/', checkToken, async function(req, res, next) {
  const books =await bookModel.find()
  res.render("list", {books: books});
});

router.get('/logout', (req, res) =>{
  res.clearCookie('token');
  res.redirect('/login')
})

module.exports = router;

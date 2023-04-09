const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const config = require('../config/database')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database)

router.post('/', async (req,res) =>{
  
  if(!req.body.username || !req.body.password){
    res.render('signup', { signup_failed: 'Dang ky that bai' });
  }else{
    const user = new userModel(req.body)
    
    await user.save()

    res.render('login')
  }
})

router.get('/', function (req, res, next) {
    res.render('signup', { signup_failed: '' });
  });


module.exports = router;
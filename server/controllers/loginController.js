const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login
exports.login_get = (req, res) => {
    if (req.cookies.jwtToken) return res.redirect('/welcome');
    try {
      res.render('login.ejs', { message: '' });
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userDB = await User.findOne({ email: email });
      if (!userDB)
        return res.render('login.ejs', {
          message: 'Usr name or pwd do not exist',
        });
  
      const validUser = await bcrypt.compare(password, userDB.password);
  
      if (!validUser)
        return res.render('login.ejs', {
          message: 'Usr name or pwd do not exist',
        });
  
      const jwtToken = await jwt.sign({ userDB: userDB }, process.env.SECRET_KEY);
  
      if (jwtToken) {
        const cookie = req.cookies.jwtToken;
        if (!cookie) {
          res.cookie('jwtToken', jwtToken, { maxAge: 10000000, httpOnly: true });
        }
        res.redirect('/welcome');
      }
    } catch (err) {
      console.log(err);
    }
  };
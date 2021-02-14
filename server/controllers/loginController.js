const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login
exports.login_get = (req, res) => {
    // if (req.cookies.jwtToken) return res.redirect('/welcome');
    try {
      res.render('login.ejs');
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    try {
      if (!email || !password) {
          return errors.push({ msg: "All fields need to be filled in." }),
          res.render('login.ejs', {
              errors,
              email, 
              password 
          })
      }
      const userDB = await User.findOne({ email: email });
      if (!userDB) {
        return errors.push({ msg: "This email is not registered. You need to register an account before being able to log in."}),
        res.render('login.ejs', {
          errors,
          userDB
        });
        }
      const validUser = await bcrypt.compare(password, userDB.password);
      if (!validUser) {
        return errors.push({ msg: "Password is incorrect." }),
        res.render('login.ejs', {
          errors,
          validUser
        });
        }
      const jwtToken = await jwt.sign({ userDB: userDB }, process.env.SECRET_KEY);
      if (jwtToken) {
        const cookie = req.cookies.jwtToken;
        if (!cookie) {
          res.cookie('jwtToken', jwtToken, { maxAge: 10000000, httpOnly: true });
        }
        req.flash("success_msg", "You are now logged in!");
        res.redirect('/welcome');
      }
    } catch (err) {
      console.log(err);
    }
  };
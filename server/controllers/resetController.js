const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.reset_get = (req, res) => {
    try {
      res.render('users/reset.ejs');
    } catch (err) {
      console.log(err);
    }
  };
  
const transport = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.USERPASSWORD,
    },
  });
  
exports.reset_post = async (req, res) => {
    const email = req.body.email;
    let errors = [];

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return errors.push({ msg: "Email is not registered. Please try again or go to register for a new account."}),
        res.render('users/reset.ejs', {
          errors,
          user
        });
        }

      const cryptoUrl = await crypto.randomBytes(32).toString('hex');
      user.cryptoUrl = cryptoUrl;
      user.cryptoUrlExpiration = Date.now() + 300000;
      await user.save();

      await transport.sendMail({
        from: process.env.USERMAIL,
        to: user.email,
        subject: 'Reset your password',
        html: `<h4>Please follow this <a href="http://localhost:3000/user/reset/${user.cryptoUrl}">Link</a> to reset password</h4>`,
      });
      
      req.flash("success_msg", "An email has been sent to your adress, please check your inbox.")
      res.redirect("/user/reset");

    } catch (err) {
        if (err) {
        return errors.push({ msg: "An error has occured. Please try sending the email again."}),
        res.render('users/reset.ejs', {
            errors,
            err
        });
        }
    }
  };
  
  exports.verifyCryptoUrl_get = async (req, res) => {
    const cryptoUrl = req.params.cryptoUrl;

    try {
      const user = await User.findOne({
        cryptoUrl: cryptoUrl,
        cryptoUrlExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        req.flash("warning_msg", "You are not a registered user, please register");
        res.redirect('/user/register');   
    } 
        
        res.render('users/resetForm.ejs', { email: user.email });
    
    } catch (err) {
      console.log(err.message);
    }
  };
  
  exports.resetPasswordForm_post = async (req, res) => {
    const { email, password, password2 } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      if (password !== password2) {
        req.flash( "warning_msg", "Passwords do not match"),
        res.redirect('back');
      }
      if (password.length < 6) {
        req.flash( "warning_msg", "Password must be atleast 6 characters long."),
        res.redirect('back');
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = hashedPassword;
      user.save();
      req.flash("success_msg", "Your password has been reset and you can now log in with your new password." )
      res.redirect('/user/login');
    } catch (err) {
      console.log(err);
    }
  };
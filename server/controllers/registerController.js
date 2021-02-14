const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register
exports.register_get = (req, res) => {
    try {
      res.render('register.ejs', { message: '' });
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.register_post = async (req, res) => {
    const userMail = await User.findOne({ email: req.body.email });
    const userName = await User.findOne({ name: req.body.name });
 
    try {
    if (req.body.email == '' || req.body.name == '' || req.body.password == '' ) {
        return res.render('register.ejs', { message: 'Please fill in all fields' });
    }
    if (userMail || userName) {
      res.render('register.ejs', { message: 'email or username already exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      newUser.save();
      res.render('index.ejs', { message: 'You are registered' });
    }
    } catch (err) {
        console.log(err.message);
    }
  };

 
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register
exports.register_get = (req, res) => {
    try {
      res.render('users/register.ejs');
    } catch (err) {
      console.log(err);
    }
  };
  
  exports.register_post = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
 
    try {
    if (!name || !email || !password || !password2 ) {
        return errors.push({msg: "All fields need to be filled in."}),
        res.render('users/register.ejs', { 
            errors,
            name,
            email,
            password,
            password2
        });
    }
    if (password !== password2) {
        return errors.push({ msg: "The passwords does not match." }),
        res.render('users/register.ejs', {
            errors,
            password,
            password2
        })
    }
    if (password.length < 6) {
        return errors.push({ msg: "Password must be atleast 6 characters long." }),
        res.render('users/register.ejs', {
            errors,
            password,
            password2
        })
    }
    const userMail = await User.findOne({ email: email });
    const userName = await User.findOne({ name: name });
    if (userName) {
        return errors.push({ msg: "This username already exists, please try another." }),
        res.render('users/register.ejs', {
            errors,
            userName,
        }) 
    } 
    if (userMail) {
        return errors.push({ msg: "This email is taken, please try another." }),
        res.render('users/register.ejs', {
              errors,
              userMail,
        }) 
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        newUser.save();
        req.flash("success_msg", "Congratulations, you are now registered and can log in!");
        res.redirect("/user/login");
      }
    } catch (err) {
        console.log(err);
    }
  };

 
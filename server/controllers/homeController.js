exports.showWelcome = (req, res) => {
    try {
      res.render('users/welcome.ejs');
    } catch (err) {
      console.log(err);
    }
  };

  exports.logout_get = (req, res) => {
    res.clearCookie('jwtToken')
    req.flash("warning_msg", "You are now logged out!")
    res.redirect('/');
  };
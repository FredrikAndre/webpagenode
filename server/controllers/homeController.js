exports.showWelcome = (req, res) => {
    try {
      res.render('welcome.ejs', { message: '' });
    } catch (err) {
      console.log(err);
    }
  };

  exports.logout_get = (req, res) => {
    res.clearCookie('jwtToken')
    req.flash("success_msg", "You are now logged out!")
    res.redirect('/');
  };
exports.showWelcome = (req, res) => {
    try {
      res.render('welcome.ejs', { message: '' });
    } catch (err) {
      console.log(err);
    }
  };

  exports.logout_get = (req, res) => {
    res.clearCookie('jwtToken').redirect('/welcome');
  };
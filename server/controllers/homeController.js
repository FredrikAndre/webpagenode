exports.showWelcome = (req, res) => {
    try {
      res.render('welcome.ejs', { message: '' });
    } catch (err) {
      console.log(err);
    }
  };
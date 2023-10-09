const passport = require('passport');

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },
};

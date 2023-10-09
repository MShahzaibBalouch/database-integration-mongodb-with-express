const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

// Register route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await User.register(new User({ username }), password);
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.redirect('/auth/register');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

// Logout route
// Logout route
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
});


module.exports = router;

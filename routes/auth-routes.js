const passport = require("passport")
const router = require("express").Router();

const UserPlain = require('../models/UserPlain.model.js')/* maybe change to User.model.js*/
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => res.render('auth/signup'));
 
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
 
  // 1. Check username and password are not empty
  if (!username || !password) {
    res.render('auth/signup', { errorMessage: 'Indicate username and password' });
    return;
  }
 
  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user !== null) {
        res.render('auth/signup', { message: 'The username already exists' });
        return;
      }
 
      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
 
      //
      // Save the user in DB
      //
 
      const newUser = new User({
        username,
        password: hashPass
      });
 
      newUser
        .save()
        .then(() => res.redirect('/'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});




router.get('/login', (req, res, next) => res.render('auth/login'));
 
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);






module.exports = router
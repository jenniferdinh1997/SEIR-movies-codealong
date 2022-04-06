const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/movies')
});

//takes the client to the third party login screen
router.get('/auth/google', passport.authenticate (
  'google',
  {scope: ['profile', 'email']}
))

//set up google oauth callback route
//after the third party login screen, google sends us here
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/movies',
    failureRedirect: '/movies'
  }
))

//logout route
router.get('logout', function(res,req) {
  req.logout; //this is a passport method that destroys the cookies so we no longer know who the client is
  req.redirect('/movies');
})

module.exports = router;

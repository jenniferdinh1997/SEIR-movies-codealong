const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/movies')
});

//takes the client to the third party login screen
router.get('/auth/google', passport.authenticate ( //our app routes us to google's sign in page
  'google',
  {scope: ['profile', 'email']}
))

//set up google oauth callback route
//after the third party login screen, google sends us here
router.get('/oauth2callback', passport.authenticate( //google sends you back here after signing in 
  'google',
  {
    successRedirect: '/movies', //if successful login then redirect the client back to movies route
    failureRedirect: '/movies'
  }
))

//logout route
router.get('logout', function(res,req) {
  req.logout; //this is a passport method that destroys the cookies so we no longer know who the client is
  req.redirect('/movies');
})

module.exports = router;

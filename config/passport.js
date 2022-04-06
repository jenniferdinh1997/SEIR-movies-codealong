const passport = require('passport');

//also need the passport strategy (unique to each 3rd party provider)
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

//setup middleware
passport.use(
    new GoogleStrategy({ //configuration object
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    }, 
    function(accessToken, refreshToken, profile, cb){ //will be called when the user logs into the app
        //cb is what we refer to as the verify callback, passes info to passport.serializeUser

        //has a user logged in with oauth before?
        User.findOne({googleId: profile.id}, function(err, user) { 
        //if user is defined, they have logged in before
        //if user is undefine they have never logged in
        if(user) return cb(null,user); //passes info to next spot in the middleware chain
        
        //if user is undefined we want to create a user
        User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails(0).value,
            avatar: profile.photos(0).value

        }, function(err, createUser){
            if(createUser) return cb(null, createdUser)
            if(err) return cb(err)
            })
        })
    })
)

passport.serializeUser(function(user, cb){
    cb(null, user._id); //storing the logged in user's id in our session cookie
})

//this happens on every request after the user is loggeed in
passport.deserializeUser(function(userId, cb) {
    User.findById(userId, function(err, user) {
        if(err) return cb(err);
        cb(null, user); //assigns the user document we just found to the request object aka req.user
    })
})
require('dotenv').config(); //allows our server to read from the .env file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

// connect to the database with Mongoose
require('./config/database');
require('./config/passport'); //make sure this is after database connection because we need to use the db in this file
var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const performersRouter = require('./routes/performers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setting up our session cookie
//session cookie is going to be sent back and forth on every HTTP request/response cycle
//store logged in user's database id inside it
app.use(session({
  secret: process.env.SECRET, //process = node, env = environment (what computer we're running it in), variable
  resave: false, //only save the cookie if we change anything on it
  saveUninitialized: true //don't save it until we put something in
}));
app.use(passport.initialize()); //passport has to be setup after session
app.use(passport.session()); //<- gives us req.user
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.user = req.user; //res.locals will assign a variable to every single ejs view (like creating global variables for view)
  next(); //making a user variable in all ejs templates, if defined then that means req. user exists
});

app.use('/movies', moviesRouter); // every route in the moviesRoute is starting with /movies
app.use('/', reviewsRouter); // Nested resources aka reviews, they are always mounted in server.js
// at /
app.use('/', performersRouter); // Implementing Many to Many relationship, nested resource remember we mount at '/'
app.use('/', indexRouter); //localhost:3000


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const Movie = require("../models/movie");
const Performer = require('../models/performer');


//On the Movies show page, 
// we want a dropdown with all the performers
// that exist that are not in the particular movie already
function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast') // <- cast is key holding the reference on movie model
  .exec(function(err, movie) {
    // console.log(movie, ' < movie in show route')
    // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
    // Native MongoDB approach 
    Performer.find(
     {_id: {$nin: movie.cast}}, // $nin not in whatever the value is 
     function(err, performers) {
       console.log(performers);
       res.render('movies/show', {
         title: 'Movie Detail', movie: movie, performers: performers
       });
     }
   );
  });
}

function newMovie(req, res) {
  res.render("movies/new", { title: "Add Movie" });
}

function index(req, res) {
  Movie.find({}, function (err, movies) {
      res.render("movies/index", {
        // <-  this refers to the view folder, to find the page we want to send
        // back to the client
        movies,
        title: "All Movies",
      });
  });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas


  // ONE WAY
  const movie = new Movie(req.body);
  movie.save(function (err) { // mongoose talking 
    //to mongodb and saying put this object in the movies collection in the database
    // one way to handle errors
    console.log(err, " this err");
    if (err) return res.redirect("/movies/new");
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect(`/movies/${movie._id}`);
  });

  // another way!
//   Movie.create(req.body, function(err, movie){ // < - this function gets invoked when there is a response from mongodb
// // err is the response from the db if there was an issue // the movie above this, is the document created in the db
//     if (err) return res.redirect("/movies/new");
//     console.log(movie);
//     // for now, redirect right back to new.ejs
//     res.redirect("/movies");
//   })





}

module.exports = {
  new: newMovie,
  create,
  index,
  show,
};

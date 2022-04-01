const Movie = require("../models/movie");

function show(req, res) {
  Movie.findById(req.params.id, function (err, movieFromTheDatabase) {
    res.render("movies/show", { title: "Movie Detail", movie: movieFromTheDatabase });
  });
}

function newMovie(req, res) {
  res.render("movies/new", { title: "Add Movie" });
}

function index(req, res) {
  Movie.find({}, function (err, movies) {
    res.render("movies/index", { // <-  this refers to the view folder, to find the page we want to send
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
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ",");
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(",");
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }

  // ONE WAY
  const movie = new Movie(req.body);
  movie.save(function (err) { // mongoose talking 
    //to mongodb and saying put this object in the movies collection in the database
    // one way to handle errors
    console.log(err, " this err");
    if (err) return res.redirect("/movies/new");
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect("/movies");
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

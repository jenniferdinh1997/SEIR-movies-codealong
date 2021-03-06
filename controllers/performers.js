const Performer = require('../models/performer');
const Movie = require('../models/movie');
const movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res){
	// console.log(req.body, " <- req.body")
	// console.log(req.params, ' < req.params')
	// First find the movie
	Movie.findById(req.params.id, function(err, movieDocument){
		// console.log(movieDocument, " <- from the callback Move.findById")
		// add the performer id to the movie cast array
		movieDocument.cast.push(req.body.performerId);
		// If you mutate a mongo document what do you have to do?
		// does the database know you changed it?
		movieDocument.save(function(err){
		// respond back to the client (res.redirect)
			res.redirect(`/movies/${movieDocument._id}`)

		})
	})

}



function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function (err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}
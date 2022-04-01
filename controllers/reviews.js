// this is our movie model, which can talk to the database
const Movie = require('../models/movie')

module.exports = {
	create
}

function create(req, res){
	// two things we need to know from the request?
	// req.params.id = id of the movie we want to tadd the review to
	// req.body - contents of the form, which is the review we want to add to the movie
	// console.log(req.body)
	// console.log(req.params.id)
	// res.send('hello im hitting the create route in the reviews change me later')
	// Find the movie from the database
	// Movie.findById is a mongoose Method
	Movie.findById(req.params.id, function(err, movieFromTheDatabase) {
		// add the review (req.body) to the movieFromTheDatabase
		movieFromTheDatabase.reviews.push(req.body); // mutating a document 
		// we have to tell mongodb we changed the document, 
		// tell mongodb by save
		movieFromTheDatabase.save(function(err){
			console.log(movieFromTheDatabase)
			// then we want to respond to the client!
			 // redirect them to a page, What page makes sense to redirect?
			res.redirect(`/movies/${movieFromTheDatabase._id}`)	
		})

	})
		
	// res.send('hello')
	
	// 
	

}
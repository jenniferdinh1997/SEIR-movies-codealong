var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

// all of these start with /movies, because of this code in our server
// app.use('/movies', moviesRouter);

// THis matches the URL
//movies
router.get('/', moviesCtrl.index);

// GET /movies/new
router.get('/new', moviesCtrl.new);
//movies/
router.get('/:id', moviesCtrl.show);
// POST /movies
router.post('/', moviesCtrl.create);



module.exports = router;

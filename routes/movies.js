var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');


router.get('/', moviesCtrl.index);
// GET /movies/new
router.get('/new', moviesCtrl.new);

router.get('/:id', moviesCtrl.show);
// POST /movies
router.post('/', moviesCtrl.create);



module.exports = router;

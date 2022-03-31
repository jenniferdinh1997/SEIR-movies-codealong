var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET /movies/new
router.get('/new', moviesCtrl.new);
// POST /movies
router.post('/', moviesCtrl.create);

router.get('/index', moviesCtrl.index);

module.exports = router;

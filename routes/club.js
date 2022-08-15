const router = require('express').Router();

const cache = require('../middlewares/cache');

const club = require('../controllers/club');

router.get('/all', cache(club.getAll, 60*60));
router.get('/:id', cache(club.getOne, 60*5));

module.exports = router;
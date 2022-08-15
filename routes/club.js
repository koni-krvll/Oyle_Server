const router = require('express').Router();

const cache = require('../middlewares/cache');

const club = require('../controllers/club');

router.get('/all', cache(club.getAll, 60*60));

module.exports = router;
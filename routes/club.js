const router = require('express').Router();

const cacheAndProtect = require('../middlewares/cacheAndProtect');

const club = require('../controllers/club');

router.get('/all', cacheAndProtect(club.getAll, 60));
router.get('/:id', cacheAndProtect(club.getOne, 5));

module.exports = router;
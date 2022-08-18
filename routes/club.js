const router = require('express').Router();

const { getAll, getOne } = require('../controllers/club');

const cache = require('../middlewares/cache');

router.get('/all', cache(getAll, 90));
router.get('/:id', cache(getOne, 30));

module.exports = router;
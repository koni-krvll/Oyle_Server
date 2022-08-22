'use strict';

const router = require('express').Router();

const { getAll, getOne } = require('../controllers/event');

const cache = require('../middlewares/cache');
const check = require('../middlewares/check');

router.get('/all', cache(getAll, 90));
router.get('/:id', cache(getOne, 30));

module.exports = router;
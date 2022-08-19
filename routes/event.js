'use strict';

const router = require('express').Router();

const { getAll, getOne } = require('../controllers/event');

const cache = require('../middlewares/cache');
const check = require('../middlewares/check');

const { isPositiveInt } = require('../utilities/checkers');

router.get('/all', cache(getAll, 90));
router.get('/:id', check(
    cache(getOne, 30),
    {
        params:
            [
                { name: 'id', checker: isPositiveInt }
            ]
    }
));

module.exports = router;
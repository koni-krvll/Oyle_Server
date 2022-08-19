'use strict';

const router = require('express').Router();

router.get('/status', (req, res) => {
    res.status(200).send('OK');
});

router.use('/club', require('./club'));
router.use('/event', require('./event'));

module.exports = router;
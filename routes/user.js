'use strict';

const router = require('express').Router();

const { register, login } = require('../controllers/user');

const check = require('../middlewares/check');
const auth = require('../middlewares/auth');

// TODO: Add checkers
router.post('/create', check(register, {
    body: [
        { name: 'email', checker: () => true },
        { name: 'phone', checker: () => true },
        { name: 'password', checker: () => true },
        { name: 'name', checker: () => true },
    ],
}));

// TODO: Add default checker
router.get('/login', auth, login);

module.exports = router;
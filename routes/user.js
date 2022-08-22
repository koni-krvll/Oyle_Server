'use strict';

const router = require('express').Router();

const { register, login } = require('../controllers/user');

const check = require('../middlewares/check');
const auth = require('../middlewares/auth');

// TODO: Add default checker
router.get('/login', auth, login);

module.exports = router;
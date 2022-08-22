'use strict';

const router = require('express').Router();

const { login } = require('../controllers/user');

const auth = require('../middlewares/auth');

// TODO: Add default checker
router.get('/login', auth, login);

module.exports = router;
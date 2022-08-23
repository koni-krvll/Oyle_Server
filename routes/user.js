'use strict';

const router = require('express').Router();

const { login, startDdm, stopDdm } = require('../controllers/user');

const auth = require('../middlewares/auth');

router.get('/login', auth, login);
router.post('/ddm/setup', auth, startDdm);
router.post('/ddm/stop', auth, stopDdm);

module.exports = router;
'use strict';

const router = require('express').Router();

const { login, startDdm, stopDdm, ddmAlive } = require('../controllers/user');

const auth = require('../middlewares/auth');

router.get('/login', auth, login);
router.post('/ddm/setup', auth, startDdm);
router.post('/ddm/stop', auth, stopDdm);
router.get('/ddm/alive', auth, ddmAlive);

module.exports = router;
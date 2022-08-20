'use strict';

const auth = require('../models/auth');
const user = require('../models/user');

const { success } = require('../utilities/messages');

const filter = require('../utilities/filter');

async function login(req, res) {
    res.status(200).send(success);
}

module.exports = {
    login
}
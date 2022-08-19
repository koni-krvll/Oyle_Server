'use strict';

const auth = require('../models/auth');

const user = require('../models/user');
const { invalid } = require('../utilities/errors');
const { success } = require('../utilities/messages');

const filter = require('../utilities/filter');

async function register(req, res) {
    auth
        .createUser({
            email: req.body.email,
            emailVerified: false,
            phoneNumber: req.body.phone,
            password: req.body.password,
            displayName: req.body.name,
            disabled: false
        })
        .then(async (newUser) => {
            await user.create({
                data: {
                    ...filter(newUser, ['uid', 'email', 'phoneNumber', 'displayName'])
                },
            });
            res.status(200).send(success);
        })
        .catch(() => res.status(400).send(invalid));
}

async function login(req, res) {
    res.status(200).send(success);
}

module.exports = {
    register,
    login
}
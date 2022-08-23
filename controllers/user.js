'use strict';

const auth = require('../models/auth');
const user = require('../models/user');
const ddm = require('../models/ddm');

const { success } = require('../utilities/messages');
const { invalid } = require('../utilities/errors');

async function login(req, res) {
    res.status(200).send(success);
}

async function startDdm(req, res) {

    const {
        starts,
        ends,
        phone,
        message,
        interval,
        password
    } = req.body;

    const ddmLookup = await ddm.findUnique({
        where: {
            userUid: req.user.uid,
        },
    });

    if (ddmLookup) {
        res.status(500).send(invalid);
    } else {
        const ddmCreated = await ddm.create({
            data: {
                starts,
                ends,
                phone,
                interval: +interval,
                password,
                message,
                user: {
                    connect: {
                        uid: req.user.uid,
                    },
                },
            },
        });
        res.status(200).send(ddmCreated);
    }
}

async function stopDdm(req, res) {
    const {
        password
    } = req.body;

    const userLookup = await user.findUnique({
        where: {
            uid: req.user.uid,
        },
        include: {
            DDMSwitch: true
        }
    });

    const ddmLookup = userLookup.DDMSwitch;

    if (!ddmLookup) {
        res.status(500).send(invalid);
    } else {
        if (ddmLookup.password === password) {
            await ddm.delete({
                where: {
                    id: ddmLookup.id,
                },
            });
            res.status(200).send(success);
        } else {
            res.status(201).send(invalid);
        }
    }
}

module.exports = {
    login,
    startDdm,
    stopDdm,
}
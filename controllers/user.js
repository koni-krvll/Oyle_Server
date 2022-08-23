'use strict';

const auth = require('../models/auth');
const user = require('../models/user');
const ddm = require('../models/ddm');

const { success } = require('../utilities/messages');
const { invalid } = require('../utilities/errors');
const sms = require('../utilities/sms');

async function login(req, res) {
    res.status(200).send(await user.findUnique({
        where: {
            uid: req.user.uid,
        },
        include: {
            DDMSwitch: true
        }
    }));
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

        const updated = new Date().toISOString();

        const ddmCreated = await ddm.create({
            data: {
                starts,
                ends,
                phone,
                interval: +interval,
                password,
                message,
                updated,
                user: {
                    connect: {
                        uid: req.user.uid,
                    },
                },
            },
        });

        startDdmCron(ddmCreated);

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

async function ddmAlive(req, res) {
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
        const updated = new Date().toISOString();
        await ddm.update({
            where: {
                id: ddmLookup.id,
            },
            data: {
                updated,
            },
        });
        res.status(200).send(success);
    }
}

async function startDdmCron(ddmCron) {
    const ddmLookup = await ddm.findUnique({
        where: {
            id: ddmCron.id,
        },
        include: {
            user: true,
        },
    });
    if (!ddmLookup) {
        console.log("Assuming ddm already ended! Finishing", ddmCron);
    } else {
        const now = new Date();
        const updated = new Date(ddmLookup.updated);
        const ends = new Date(ddmLookup.ends);
        const fails = new Date(+updated + (ddmLookup.interval * 1000));
        if (now > ends) {
            console.log('We are finished here');
            return;
        }
        console.log(now.toISOString(), updated.toISOString(), fails.toISOString());
        if (now > fails) {
            sms(
                `Oyle service - Someone needs your help. This is the message they left you: ${ddmLookup.message}`,
                ddmLookup.phone
            );
            await ddm.delete({
                where: {
                    id: ddmLookup.id,
                },
            });
        } else {
            setTimeout(() => {
                startDdmCron(ddmLookup);
            }, ddmLookup.interval * 1000);
        }
    }
}

module.exports = {
    login,
    startDdm,
    stopDdm,
    ddmAlive
}
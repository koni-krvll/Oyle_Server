'use strict';

const fetch = require('../utilities/insecureFetch');
const { leech } = require('../utilities/headers');

async function getAll(req, res) {
    const data = await fetch(`${process.env.LEECH}/events`, leech);
    res.status(200).send(data);
}

async function getOne(req, res) {
    const data = await fetch(`${process.env.LEECH}/events/${req.params.id}`, leech);
    res.status(200).send(data);
}

module.exports = {
    getAll,
    getOne
}
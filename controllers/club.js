'use strict';

const club = require('../models/club');

const fetch = require('../utilities/insecureFetch');
const { leech } = require('../utilities/headers');

async function getAll(req, res) {
    res.status(200).send(await club.findMany());
}

async function getOne(req, res) {
    const data = await fetch(`${process.env.LEECH}${req.params.id}`, leech);
    res.status(200).send(data);
}

module.exports = {
    getAll,
    getOne,
}
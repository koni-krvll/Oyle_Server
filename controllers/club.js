'use strict';

const club = require('../models/club');

const fetch = require('../utilities/insecureFetch');
const { leech } = require('../utilities/headers');

const { notFound } = require('../utilities/errors');

async function withLeech(club) {
    return {
        ...club,
        ...await fetch(`${process.env.LEECH}/${club.placeId}`, leech)
    }
}

async function getAll(req, res) {
    res.status(200).send(await club.findMany());
}

async function getOne(req, res) {
    const c = await club.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!c)
        res.status(401).send(notFound);
    else
        res.status(200).send(await withLeech(c));
}

module.exports = {
    getAll,
    getOne,
}
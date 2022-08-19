'use strict';

const club = require('../models/club');

const fetch = require('../utilities/insecureFetch');

async function withLeech(club) {
    return {
        ...club,
        ...await fetch(`${process.env.LEECH}/${club.placeId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.LEECH_TKN}`,
            }
        })
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
        res.status(401).send({ message: 'Not found' });
    else
        res.status(200).send(await withLeech(c));
}

module.exports = {
    getAll,
    getOne,
}
'use strict';

const fetch = require('../utilities/insecureFetch');
const { leech } = require('../utilities/headers');
const event = require('../models/event');

async function getAll(req, res) {
    const data = await fetch(`${process.env.LEECH}events`, leech);
    res.status(200).send(data);
}

async function getOne(req, res) {

    const cachedEvent = await event.findUnique({
        where: {
            id: +req.params.id,
        },
        include: {
            club: true
        }
    });

    if (cachedEvent) {
        res.status(200).send(cachedEvent);
    } else {
        const data = await fetch(`${process.env.LEECH}events/${req.params.id}`, leech);
        const club = await fetch(`${process.env.LEECH}${data.club}`, leech);
        const query = {
            where: {
                id: data.id
            },
            update: {},
            create: {
                id: data.id,
                name: data.name,
                description: data.description,
                age: +data.age,
                cost: data.cost,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                attending: data.attending,
                lineup: data.lineup,
                ticketed: data.ticketed,
                festival: data.festival,
                images: data.images,
            }
        };
        if (Object.keys(club).length > 0) {
            query.create.club = {
                connectOrCreate: {
                    where: { id: +club.id },
                    create: { ...club }
                },
            };
            query.include = {
                club: true
            }
        }
        try {
            const newEvent = await event.upsert(query);
            res.status(200).send(newEvent);
        }
        catch (e) {
            console.error(e);
        }
    }
}

module.exports = {
    getAll,
    getOne
}
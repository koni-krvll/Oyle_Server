const { prismaClientInstance } = require('../models');
const { fetcher } = require('../utils');

async function clubWithLeech(club) {
    try {
        const data = await fetcher(`${process.env.LEECH_URL}${club.placeId}`, {
            headers: {'Authorization': `Bearer ${process.env.LEECH_TKN}`}
        });
        const object = await data.json();
        return {
            ...club,
            currentPopularity: object['current_popularity'],
            popularTimes: object['populartimes'],
        }
    } catch(ignored) {
        return {
            ...club,
        }
    }
}

const getAll = async (req, res) => {
    let clubs = await prismaClientInstance.club.findMany();
    clubs = await Promise.all(clubs.map(clubWithLeech));
    res.status(200).send(clubs);
}

module.exports = {
    getAll
}
const { prismaClientInstance } = require('../models');
const { fetcher } = require('../utils');

/**
 * Gets a club from the database, tries to append leech data and returns it back
 * @param club The club to leech data from
 * @returns {Promise<(*&{currentPopularity, popularTimes})|*>} The club with optionally leech data
 */
async function clubWithLeech(club) {
    try {
        const data = await fetcher(`${process.env.LEECH_URL}${club.placeId}`, {
            headers: {'Authorization': `Bearer ${process.env.LEECH_TKN}`}
        });
        const object = await data.json();
        return {
            ...club,
            popularity: {
                ...object,
            }
        }
    } catch(ignored) {
        return {
            ...club,
        }
    }
}

/**
 * Gets all clubs from the database with leech data
 */
const getAll = async (req, res) => {
    let clubs = await prismaClientInstance.club.findMany();
    clubs = await Promise.all(clubs.map(clubWithLeech));
    res.status(200).send(clubs);
}

/**
 * Gets a club with the passed id as param and returns it with leech data
 */
const getOne = async (req, res) => {
    const { id } = req.params;
    const club = await prismaClientInstance.club.findUniqueOrThrow({
        where: {
            id: +id
        }
    });
    res.status(200).send(await clubWithLeech(club));
}

module.exports = {
    getAll,
    getOne,
}
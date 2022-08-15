const _ = require('lodash');
const { prismaClientInstance } = require('../models');
const { fetcher } = require("../utils");

let clubs = [];
let currentClubIndex = 0;

/**
 * Updates the leech data of the passed club contacting the leech API
 * @param club The club to update
 */
async function leechSync(club) {
    console.log(`Updating leech data for club ${club.name}`);
    try {
        const data = await fetcher(`${process.env.LEECH_URL}${club.placeId}`, {
            headers: {'Authorization': `Bearer ${process.env.LEECH_TKN}`}
        });
        const object = await data.json();
        await prismaClientInstance.club.update({
            where: {
                id: club.id
            },
            data: {
                popularity: object
            }
        });
    } catch(e) {
        console.error(e);
    }
}

async function startLeechSync(seconds = 60) {
    clubs = await prismaClientInstance.club.findMany();
    setInterval( async () => {
        if(currentClubIndex >= clubs.length) currentClubIndex = 0;
        leechSync(clubs[currentClubIndex])
            .then(() => currentClubIndex++)
            .catch(console.error);
    }, 1000 * seconds);
}

module.exports = {
    startLeechSync
}
const { prismaClientInstance } = require('../models');

/**
 * Gets all clubs from the database with leech data
 */
const getAll = async (req, res) => {
    let clubs = await prismaClientInstance.club.findMany();
    res.status(200).send(clubs);
}

/**
 * Gets a club with the passed id as param and returns it with leech data
 */
const getOne = async (req, res) => {
    const { id } = req.params;
    const club = await prismaClientInstance.club.findUniqueOrThrow({where: {id: +id}});
    res.status(200).send(club);
}

module.exports = {
    getAll,
    getOne,
}
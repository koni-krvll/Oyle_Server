const fetch = require('../utilities/insecureFetch');

async function getAll(req, res) {
    const data = await fetch(`${process.env.LEECH}/events`, {
            headers: {
                'Authorization': `Bearer ${process.env.LEECH_TKN}`,
            }
    });
    res.status(200).send(data);
}

async function getOne(req, res) {
    const data = await fetch(`${process.env.LEECH}/events/${req.params.id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.LEECH_TKN}`,
        }
    });
    res.status(200).send(data);
}

module.exports = {
    getAll,
    getOne
}
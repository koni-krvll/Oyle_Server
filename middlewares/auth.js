const auth = require('../models/auth');

const { unauthorized } = require('../utilities/errors');

function authorize(req, res, next) {
    const bearer = req.headers['authorization'].split(' ')[1];
    auth
        .verifyIdToken(bearer)
        .then((token) => {
            req.user = token;
            next();
        })
        .catch(() => {
            res.status(400).send(unauthorized);
        });
}

module.exports = authorize;
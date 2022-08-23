const user = require('../models/user');
const auth = require('../models/auth');

const { unauthorized } = require('../utilities/errors');
const filter = require('../utilities/filter');

function authorize(req, res, next) {
    const bearer = req.headers['authorization'].split(' ')[1];
    auth
        .verifyIdToken(bearer)
        .then(async (decoded) => {
            await user.upsert({
                where: {
                    uid: decoded.uid,
                },
                update: {
                    uid: decoded.uid
                },
                create: {
                    uid: decoded.uid
                }
            });
            req.user = decoded;
            next();
        })
        .catch((e) => {
            console.error(e);
            res.status(400).send(unauthorized);
        });
}

module.exports = authorize;
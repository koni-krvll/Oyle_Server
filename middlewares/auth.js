const user = require('../models/user');
const auth = require('../models/auth');

const { unauthorized } = require('../utilities/errors');

function authorize(req, res, next) {
    const bearer = req.headers['authorization'].split(' ')[1];
    auth
        .verifyIdToken(bearer)
        .then((decoded) => {
            await user.upsert({
                where: {
                    uid: decoded.uid,
                },
                update: {
                    ...filter(decoded, ['uid', 'email', 'phoneNumber', 'displayName']),
                },
                data: {
                    ...filter(decoded, ['uid', 'email', 'phoneNumber', 'displayName']),
                }
            });
            req['user'] = user;
            next();
        })
        .catch(() => {
            res.status(400).send(unauthorized);
        });
}

module.exports = authorize;
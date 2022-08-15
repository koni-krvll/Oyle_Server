const cache = require('./cache');
const protect = require('./protect');

function cacheAndProtect(endpoint, seconds = 60) {
    return cache(protect(endpoint, seconds));
}

module.exports = cacheAndProtect;
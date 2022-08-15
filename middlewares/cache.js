const Express = require('express');

const storage = {};

/**
 * Caches the endpoint response for the given duration
 * @param endpoint {Function} Endpoint to be cached
 * @param seconds {Number} Seconds to cache the response
 * @returns {cacheFunction} Cached endpoint
 */
function cache(endpoint, seconds = 60) {
    if (typeof endpoint !== 'function') throw new Error('Can only cache function');
    /**
     * Cache function
     * @param req {Express.Request}
     * @param res {Express.Response}
     */
    function cacheFunction(req, res) {
        const now = Date.now();
        const cached = storage[req.originalUrl];
        if (cached && cached['dies'] > now) {
            console.log('Returning cached response for ' + req.originalUrl + ' at ' + now);
            res.status(cached['status']).send(cached['data']);
        } else {
            console.log('Creating cache for ' + req.originalUrl + ' at ' + now);
            storage[req.originalUrl] = {
                status: 0,
                data: '',
                dies: (now + seconds * 1000)
            };
            res['__OgStatus'] = res.status;
            res['__OgSend'] = res.send;
            res.status = (s) => {
                storage[req.originalUrl]['status'] = s;
                return res['__OgStatus'](s);
            }
            res.send = (d) => {
                storage[req.originalUrl]['data'] = d;
                return res['__OgSend'](d);
            }
            endpoint(req, res);
            console.log('Cached response for' + req.originalUrl);
        }
    }
    return cacheFunction;
}

module.exports = cache;
'use strict';

const storage = {};

/**
 * Stores a cache in memory for the given duration
 * @param endpoint
 * @param duration
 * @returns {(function(*, *): void)|*}
 */
function cache(endpoint, duration = 60) {
    return function(req, res) {
        const now = Date.now();
        const url = req.originalUrl;
        const cached = storage[url];
        if (cached && cached['dies'] > now)
            res.status(cached['status']).send(cached['data']);
        else {
            storage[url] = {
                dies: (now + duration * 1000),
            }
            res['__OgStatus'] = res.status;
            res['__OgSend'] = res.send;
            res.status = (s) => {
                storage[url]['status'] = s;
                return res['__OgStatus'](s);
            }
            res.send = (d) => {
                storage[url]['data'] = d;
                return res['__OgSend'](d);
            }
            endpoint(req, res);
        }
    }
}

module.exports = cache;
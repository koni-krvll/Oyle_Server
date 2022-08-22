'use strict';

const storage = {};

const Express = require('express');

/**
 * Stores the response in memory for the given duration
 * @param endpoint {(function({Express.Request}, {Express.Response}): void)|*} Endpoint to cache
 * @param duration {Number} Duration of the cache in seconds
 * @returns {(function({Express.Request}, {Express.Response}): void)|*}
 */
function cache(endpoint, duration = 60) {
    return function (req, res) {
        const now = Date.now();
        const url = req.originalUrl;
        const cached = storage[url];
        if (cached && cached['dies'] > now)
            res.status(cached['status'] || 200).send(cached['data'] || {});
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
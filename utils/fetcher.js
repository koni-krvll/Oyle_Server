const fetch = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});


/**
 * Fetches data from a URL bypassing HTTPS SSL certificate verification
 * @param {String} url URL to fetch data from
 * @param {Object} options Options to pass to the fetch method
 * @returns {Promise} Promise that resolves to the response body
 */
function fetcher(url, options = {}) {
    options = {...options, agent: httpsAgent};
    return fetch(args);
}

module.exports = fetcher;
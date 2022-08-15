const fetch = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

function fetcher(...args) {
    args[1].agent = httpsAgent;
    return fetch(args);
}

module.exports = fetcher;
'use strict';

const fetch = require('node-fetch');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

async function insecureFetch(url, options = {}) {
    if (url.startsWith('https://'))
        options['agent'] = httpsAgent;
    try {
        return await (await fetch(url, options)).json();
    } catch (e) {
        console.error(`Error on reading ${url}`, e);
        return {};
    }
}

module.exports = insecureFetch;
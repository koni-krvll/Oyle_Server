'use strict';

function filter(o, l) {
    return l.reduce((a, b) => (a[b] = o[b]) && a, {});
}

module.exports = filter;
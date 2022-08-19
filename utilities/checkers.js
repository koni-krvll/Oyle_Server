'use strict';

const isNumber = require('is-number');

const isInt = (n) => {
    try {
        return isNumber(n) && Number.isInteger(Number.parseFloat(n));
    } catch {
        return false;
    }
}

const isPositive = (n) => {
    try {
        return isNumber(n) && Number.parseInt(n) > 0;
    } catch {
        return false;
    }
}

const isPositiveInt = (n) => {
    return isInt(n) && isPositive(n);
}

module.exports = {
    isNumber,
    isInt,
    isPositive,
    isPositiveInt
}
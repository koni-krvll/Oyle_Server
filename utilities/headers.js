'use strict';

const leech = {
    headers: {
        'Authorization': `Bearer ${process.env.LEECH_TKN}`,
    }
}

module.exports = {
    leech
}
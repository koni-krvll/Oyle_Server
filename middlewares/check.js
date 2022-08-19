'use strict';

function check(endpoint, options = { params: [] }) {
    return function (req, res) {
        out: for (const key of Object.keys(options)) {
            for (const prop of options[key]) {
                if (!req[key][prop.name])
                    res.status(400).send({
                        error: `missing ${prop}.${key}`
                    });
                if (!prop.checker(req[key][prop.name]))
                    res.status(400).send({
                        error: `${prop.name}.${key} could not be validated`
                    });
                break out;
            }
        }
        if (!res.headersSent)
            endpoint(req, res);
    }
}

module.exports = check;
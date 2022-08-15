const genericError = {
    error: 500,
    message: 'Something went wrong',
};

function protect(endpoint) {
    if (typeof endpoint !== 'function') throw new Error('Can only protect function');

    function protectFunction(req, res) {
        try {
            endpoint(req, res).catch(console.error);
        } catch (e) {
            console.error(e);
        }
    }

    return protectFunction;
}

module.exports = protect;
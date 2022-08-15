function unimplemented(req, res) {
    res.status(501).send('Not Implemented');
}

module.exports = unimplemented;
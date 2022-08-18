'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1', require('./routes'));

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on ' + JSON.stringify(listener.address()));
});
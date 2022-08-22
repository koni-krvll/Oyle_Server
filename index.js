'use strict';

require('dotenv').config();

const Express = require('express');

const app = Express();

app.use(require('cors')());
app.use(Express.json());

app.use('/api/v1', require('./routes'));

require('./models/client');

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on ' + JSON.stringify(listener.address()));
});
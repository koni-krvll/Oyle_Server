'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { initializeApp, applicationDefault } = require('firebase-admin/app');

const app = initializeApp({
    credential: applicationDefault()
});

const client = Object.assign({}, prisma, app);

module.exports = client;
'use strict';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { initializeApp, cert } = require('firebase-admin/app');

const app = initializeApp({
    credential: cert({
        "projectId": process.env.FB_PROJECT_ID,
        "privateKey": process.env.FB_PRIVATE_KEY,
        "clientEmail": process.env.FB_CLIENT_EMAIL,
    })
});

const client = Object.assign({}, prisma, app);

module.exports = client;
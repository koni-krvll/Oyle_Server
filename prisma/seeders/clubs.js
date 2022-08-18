const fs = require('fs');
const club = require('../../models/club');

const clubs = fs.readFileSync('./prisma/seeders/clubs.json', 'utf8');

for (const c of JSON.parse(clubs)) {
    club.upsert({
        where: {
            id: c.id,
        },
        update: {
            ...c
        },
        create: {
            ...c
        },
    }).then(() => {
        console.log('Seeded club: ', c.name);
    }).catch(console.error);
}

console.log('Completed seeding clubs');
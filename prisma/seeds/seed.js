const fs = require('fs');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const clubs = JSON.parse(fs.readFileSync('./prisma/seeds/clubs.json', 'utf8'));

async function main() {
    for (const club of clubs) {
        console.log('Seeding club: ', club.name);
        try {
            await prisma.club.upsert({
                where: {
                    id: +club.id,
                },
                update: {},
                create: {...club,
                    id: +club.id,
                    artists: {
                        connectOrCreate: club.artists.map(artist => ({
                            where: {
                                id: artist.id
                            },
                            create: {
                                id: artist.id,
                                name: artist.name,
                            }
                        })),
                    },
                    openingHours: JSON.stringify(club.openingHours)
                }
            });
        } catch (e) {
            console.error(e);
        }

    }
}

main().then( async () => {
    await prisma.$disconnect();
}).catch( async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
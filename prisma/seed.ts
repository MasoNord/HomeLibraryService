import { PrismaClient } from "@prisma/client";
import {v4} from 'uuid';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: {
            id: v4() 
        },
        update: {},
        create: {
            id: v4(),
            version: 1,
            login: "Yohoo",
            password: "qwert1234",
            createdAt: new Date().getTime() / 1000,
            updatedAt: new Date().getTime() / 1000
        }
    });

    // const user1 = await prisma.user.upsert({
    //     where: {
    //         id: v4()
    //     },
    //     update: {},
    //     create: {
    //         id: v4(),
    //         version: 1,
    //         login: "Yohoo",
    //         password: "qwert123",
    //         createdAt: new Date().getTime() / 1000,
    //         updatedAt: new Date().getTime() / 1000
    //     }
    // })

    // const artist = await prisma.artist.upsert({
    //     where: {
    //         id: v4()
    //     },
    //     update: {},
    //     create: {
    //         id: v4(),
    //         name: "Mettalica",
    //         grammy: false,
    //         favoriteId: 1
    //     }
    // });

    // const album = await prisma.album.upsert({
    //     where: {
    //         id: v4()
    //     },
    //     update: {},
    //     create: {
    //         id: v4(),
    //         name: "Mettalica",
    //         year: 2014,
    //         artistId: artist.id,
    //         favoriteId: 1
    //     }
    // });

    // const track = await prisma.track.upsert({
    //     where: {
    //         id: v4()
    //     },
    //     update: {},
    //     create: {
    //         id: v4(),
    //         name: "Nothing Else Matters",
    //         duration: 388,
    //         artistId: artist.id,
    //         albumId: album.id,
    //         favoriteId: 1
    //     }
    // });

    const favorite = await prisma.favorite.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            id: 1,
        }
    });

    console.log({
        user,
        // user1,
        // artist,
        // album,
        // track,
        favorite
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    })
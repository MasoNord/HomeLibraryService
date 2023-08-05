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
            createdAt: 1233,
            updatedAt: 1233  
        }
    });

    const user1 = await prisma.user.upsert({
        where: {
            id: v4()
        },
        update: {},
        create: {
            id: v4(),
            version: 1,
            login: "Yohoo",
            password: "qwert123",
            createdAt: 321,
            updatedAt: 432
        }
    })

    const artist = await prisma.artist.upsert({
        where: {
            id: v4()
        },
        update: {},
        create: {
            id: v4(),
            name: "Mettalica",
            grammy: false,
        }
    });

    const album = await prisma.album.upsert({
        where: {
            id: v4()
        },
        update: {},
        create: {
            id: v4(),
            name: "Mettalica",
            year: 2014,
            artistId: artist.id,
        }
    });

    const track = await prisma.track.upsert({
        where: {
            id: v4()
        },
        update: {},
        create: {
            id: v4(),
            name: "Nothing Else Matters",
            duration: 388,
            artistId: artist.id,
            albumId: album.id,
        }
    });

    const artistId = await prisma.artist.findFirst({
        select: {
            id: true
        }
    });
    const ids: string[] = [];
    ids.push(artistId.id);

    const favorite = await prisma.favorite.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            artists: ids,
            tracks: [track.id],
            albums: [album.id]
        }
    });

    console.log({
        user,
        user1,
        artist,
        album,
        track,
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
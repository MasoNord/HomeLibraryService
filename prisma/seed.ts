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
            updatedAt: new Date().getTime() / 1000,
        }
    });
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
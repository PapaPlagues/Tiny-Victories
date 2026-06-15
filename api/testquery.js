import { prisma } from "./lib/prisma.js";

async function main() {
    const user = await prisma.user.create({ 
        data: {
            email: "test@test.com",
            passwordHash: "fakehash",
            username: "testuser"
        }
    });

    console.log("Created user:", user);

    // Fetch all users with their posts
    const allusers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log("All users: ", JSON.stringify(allusers, null, 2));
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
});
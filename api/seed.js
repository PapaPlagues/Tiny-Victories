import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
    //  RESET DATABASE
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const passwordHash = await bcrypt.hash("password", 10);

    //  ADMIN USER
    const admin = await prisma.user.create({
        data: {
            email: "admin@test.com",
            passwordHash,
            username: "admin",
            role: "ADMIN"
        }
    });

    //  NORMAL USER
    const user = await prisma.user.create({
        data: {
            email: "test@test.com",
            passwordHash,
            username: "testuser",
            role: "USER"
        }
    });

    // POST BY ADMIN
    const post = await prisma.post.create({
        data: {
            title: "Admin Post",
            content: "This is an admin-created post.",
            published: true,
            authorId: admin.id
        }
    });

    // COMMENT BY NORMAL USER
    const comment = await prisma.comment.create({
        data: {
            content: "I am a normal user comment",
            username: user.username,
            postId: post.id
        }
    });

    console.log("Seed complete:");
    console.log({ admin, user, post, comment });
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
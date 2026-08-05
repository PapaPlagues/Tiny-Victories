import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    const userEmail = process.env.SEED_USER_EMAIL;
    const userPassword = process.env.SEED_USER_PASSWORD;

    if (!adminEmail || !adminPassword || !userEmail || !userPassword) {
        throw new Error(
            "Missing seed credentials. Set SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_USER_EMAIL, and SEED_USER_PASSWORD in your environment before running this script."
        );
    }

    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
    const userPasswordHash = await bcrypt.hash(userPassword, 10);

    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            passwordHash: adminPasswordHash,
            username: "admin",
            role: "ADMIN"
        }
    });

    const user = await prisma.user.create({
        data: {
            email: userEmail,
            passwordHash: userPasswordHash,
            username: "testuser",
            role: "USER"
        }
    });

    const tag1 = await prisma.tag.create({
        data: { name: "javascript" }
    });

    const tag2 = await prisma.tag.create({
        data: { name: "prisma" }
    });

    const post = await prisma.post.create({
        data: {
            title: "Admin Post",
            content: "This is an admin-created post.",
            published: true,
            imageUrl: "https://placehold.co/600x400",
            authorId: admin.id,
            tags: {
                connect: [{ id: tag1.id }, { id: tag2.id }]
            }
        }
    });

    const comment = await prisma.comment.create({
        data: {
            content: "I am a normal user comment",
            username: user.username,
            postId: post.id
        }
    });

    console.log({ admin, user, post, comment });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
);
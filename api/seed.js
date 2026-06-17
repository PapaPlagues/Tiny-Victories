import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs"

async function main() {
    const passwordHash = await bcrypt.hash("password", 10);

    const user = await prisma.user.create({ 
        data: {
            email: "test@test.com",
            passwordHash: passwordHash,
            username: "testuser"
        }
    });

    const post = await prisma.post.create({
        data: {
            title: "My first Blog Post",
            content: "Testing Prisma and my API.",
            published: true,
            authorId: user.id,
        },
    });

    const comment = await prisma.comment.create({
        data: {
            content: "Great post!",
            username: "CommentGuy",
            postId: post.id,
        },
    });

    console.log("Created user:", user);
    console.log("Created post:", post);
    console.log("Created comment", comment);
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
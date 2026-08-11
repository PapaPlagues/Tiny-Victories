import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(
            "Missing seed credentials. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your environment."
        );
    }

    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.user.deleteMany();

    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            passwordHash: adminPasswordHash,
            username: "Jacob",
            role: "ADMIN"
        }
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
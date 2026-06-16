import { prisma } from "../lib/prisma.js";

export async function getPosts(req, res) {
    const posts = await prisma.post.findMany();

    res.json(posts);
};


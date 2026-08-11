import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const parseBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return false;
};

export const normalizeTags = (rawTags) => {
    if (Array.isArray(rawTags)) {
        return rawTags
            .map((tag) => String(tag).trim())
            .filter(Boolean);
    }

    if (typeof rawTags === "string") {
        const trimmed = rawTags.trim();

        if (!trimmed) return [];

        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                return parsed
                    .map((tag) => String(tag).trim())
                    .filter(Boolean);
            }
        } catch {
            // fall back to comma-separated parsing
        }

        return trimmed
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    return [];
};

const getRequestUser = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    const requestUser = getRequestUser(req);
    const isAdmin = requestUser?.role === "ADMIN";

    const posts = await prisma.post.findMany({
        where: isAdmin ? {} : { published: true },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            tags: true,
        },
    });

    res.json(posts);
};

// Get one post
export const getPostById = async (req, res) => {
    const { postId } = req.params;
    const requestUser = getRequestUser(req);
    const isAdmin = requestUser?.role === "ADMIN";

    const post = await prisma.post.findFirst({
        where: isAdmin
            ? { id: postId }
            : { id: postId, published: true },
        include: {
            comments: true,
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
            tags: true,
        }
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
};

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, content, published, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: "Missing title or content" });
        }

        let imageUrl = null;

        if (req.file) {
            const origin = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${origin}/uploads/${req.file.filename}`;
        }

        const normalizedTags = normalizeTags(tags);

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: published === "true" || published === true,
                imageUrl,
                authorId: req.user.userId,
                tags: normalizedTags.length > 0 ? {
                    connectOrCreate: normalizedTags.map((tagName) => ({
                        where: { name: tagName },
                        create: { name: tagName },
                    })),
                } : undefined,
            },
            include: {
                tags: true,
            },
        });

        return res.status(201).json(post);

    } catch (err) {
        console.error("CREATE ERROR:", err);
        return res.status(500).json({
            error: err.message || "Create failed"
        });
    }
};
// Update post
export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, published, tags } = req.body;

        let imageUrl = null;

        if (req.file) {
            const origin = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${origin}/uploads/${req.file.filename}`;
        }

        const updateData = {};
        
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (published !== undefined) updateData.published = parseBoolean(published);
        if (imageUrl) updateData.imageUrl = imageUrl;

        const normalizedTags = normalizeTags(tags);

        if (tags !== undefined) {
            await prisma.post.update({
                where: { id: postId },
                data: {
                    tags: {
                        set: [],
                    },
                },
            });
        }

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                ...updateData,
                ...(tags !== undefined ? {
                    tags: normalizedTags.length > 0 ? {
                        connectOrCreate: normalizedTags.map((tagName) => ({
                            where: { name: tagName },
                            create: { name: tagName },
                        })),
                    } : {
                        set: [],
                    },
                } : {}),
            },
            include: {
                tags: true,
            },
        });

        res.json(post);

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).json({ error: err.message || "Update failed" });
    }
};

// Delete post
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await prisma.post.delete({
            where: { id: postId }
        });

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
import { prisma } from "../lib/prisma.js";

const parseBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return false;
};

// Get all posts
export const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
};

// Get one post
export const getPostById = async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true,
            author: true,
        }
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found "});
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
            console.log("Processing local image upload:", req.file.originalname, req.file.size, req.file.filename);
            const origin = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${origin}/uploads/${req.file.filename}`;
            console.log("Local image saved at:", imageUrl);
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: published === "true" || published === true,
                imageUrl,
                authorId: req.user.userId,
                // add tags
            },
        });

        console.log(req.body);
        console.log(req.file);

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
            console.log("Processing local image update:", req.file.originalname, req.file.size, req.file.filename);
            const origin = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${origin}/uploads/${req.file.filename}`;
            console.log("Local image updated at:", imageUrl);
        }

        const updateData = {};
        
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (published !== undefined) updateData.published = parseBoolean(published);
        if (imageUrl) updateData.imageUrl = imageUrl;

        const post = await prisma.post.update({
            where: { id: postId },
            data: updateData,
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
        console.log("DELETE postId:", postId);

        const post = await prisma.post.delete({
            where: { id: postId }
        });

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}
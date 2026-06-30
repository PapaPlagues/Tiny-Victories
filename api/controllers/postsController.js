import { prisma } from "../lib/prisma.js";
import cloudinary from "../lib/cloudinary.js";
import { Readable } from "stream";

const parseBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return false;
};

const uploadBufferToCloudinary = async (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "posts" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
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
            const result = await uploadBufferToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
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

        let imageUrl;

        if (req.file) {
            const result = await uploadBufferToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title,
                content,
                published: parseBoolean(published),
                ...(imageUrl && { imageUrl }),
            },
        });

        res.json(post);

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).json({ error: "Update failed" });
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
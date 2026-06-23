import { prisma } from "../lib/prisma.js";

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
            comments: true
        }
    });

    if (!post) {
        return res.status(404).json({ error: "Post not found "});
    }

    res.json(post);
};

// Create Post
export const createPost = async (req, res) => {
    const {title, content} = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: false,

            authorId: req.user.userId
        }
    });
    res.status(201).json(post);
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, content, published } = req.body;
        const { postId } = req.params;

        const post = await prisma.post.update({
            where: { id: postId },
            data: { title, content, published },
        });

        res.json(post);

    } catch (err) {
        res.status(404).json({ error: "Post not found" });
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
import { prisma } from "../lib/prisma.js";
import sanitizeHtml from "sanitize-html";

// Get comments for a post
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" }
        });

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};

// Create comment for a post
export const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        let{ content, username } = req.body;

        if (typeof content !== "string" || typeof username !== "string") {
            return res.status(400).json({ error: "Invalid input type" });
        };

        content = content.trim();
        username = username.trim();

        if (!content || !username) {
            return res.status(400).json({ error: "Missing fields" });
        };

        if (content.length > 500) {
            return res.status(400).json({ error: "Comment too long (max 500)"});
        };

        if (username.length > 30) {
            return res.status(400).json({error: "Username too long (max 30)"});
        };

        const cleanContent = sanitizeHtml(content, {
            allowedTags: [],
            allowedAttributes: {}
        }).trim();

        const cleanUsername = sanitizeHtml(username, {
            allowedTags: [],
            allowedAttributes: {}
        }).trim();

        if (cleanContent !== content || cleanUsername !== username) {
            return res.status(400).json({ error: "HTML is not allowed in comments or usernames."});
        }

        const comment = await prisma.comment.create({
            data: {
                content: cleanContent,
                username: cleanUsername,
                postId,
            }
        });

        res.status(201).json(comment);
    } catch (err) {
       return res.status(500).json({ error: "Something went wrong" });
    };
   
};

// Delete comment
export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        await prisma.comment.delete({
            where: { id: commentId }
        });

        res.json({ message: "Comment deleted" });

    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ error: "Comment not found" });
        }

        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
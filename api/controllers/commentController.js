import { prisma } from "../lib/prisma.js";

// Get comments for a post
export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
};

// Create comment for a post
export const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, username } = req.body;

        const comment = await prisma.comment.create({
            data: {
                content,
                username,
                postId
            }
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    };
   
};

// Delete comment
export const deleteComment = async (req, res) => {
    try { 
        const { commentId } = req.params; 

        const comment = await prisma.comment.delete({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
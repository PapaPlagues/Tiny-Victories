import express from "express";
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsController.js";
import { getComments, createComment, deleteComment } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import upload from "../middleware/upload.js";
import rateLimit from "express-rate-limit";

const postsRouter = express.Router();

// Get all posts
postsRouter.get("/", getPosts);

// Get one post
postsRouter.get("/:postId", getPostById);

// Create post
postsRouter.post("/", verifyToken, requireAdmin, upload.single("image"), createPost);

// Update post
postsRouter.patch("/:postId", verifyToken, requireAdmin, upload.single("image"), updatePost);

// Delete post
postsRouter.delete("/:postId", verifyToken, requireAdmin, deletePost);


// ------- Comments -------
const commentLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 comments per minute per IP
});



// Get comments for a post
postsRouter.get("/:postId/comments", getComments);

// Create comment for a post
postsRouter.post("/:postId/comments", commentLimiter, createComment);

// Delete comment
postsRouter.delete("/:postId/comments/:commentId", verifyToken, requireAdmin, deleteComment);

export default postsRouter;
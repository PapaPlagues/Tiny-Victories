import express from "express";
import { getPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsController.js";
import { getComments, createComment, deleteComment } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const postsRouter = express.Router();

// Get all posts
postsRouter.get("/", getPosts);

// Get one post
postsRouter.get("/:postId", getPostById);

// Create post
postsRouter.post("/", verifyToken, requireAdmin, createPost);

// Update post
postsRouter.put("/:postId", verifyToken, requireAdmin, updatePost);

// Delete post
postsRouter.delete("/:postId", verifyToken, requireAdmin, deletePost);


// ------- Comments -------

// Get comments for a post
postsRouter.get("/:postId/comments", getComments);

// Create comment for a post
postsRouter.post("/:postId/comments", createComment);

// Delete comment
postsRouter.delete("/:postId/comments/:commentId", verifyToken, requireAdmin, deleteComment);


export default postsRouter;
import express from "express";
const postsRouter = express.Router();

import { getPosts } from "../controllers/postsController.js";


// Get all posts
postsRouter.get("/", getPosts);

// Get one post
postsRouter.get("/:postId", (req, res) => {
    return res.send(`GET HTTP method on post/${req.params.postId} resource`);
} );

// Create post
postsRouter.post("/", (req, res) => {
    return res.send("Received a POST HTTP method");
} );

// Update post
postsRouter.put("/:postId", (req, res) => {
    return res.send(`PUT HTTP method on post/${req.params.postId} resource`);
} );

// Delete post
postsRouter.delete("/:postId", (req, res) => {
    return res.send(`DELETE HTTP method on post/${req.params.postId} resource`);
} );


// ------- Comments -------

// Get comments for a post
postsRouter.get("/:postId/comments", (req, res) => {
    res.send("Received a GET HTTP method for comments");
});

// Create comment for a post
postsRouter.post("/:postId/comments", (req, res) => {
    res.send("Received a POST HTTP method for comments");
});

// Delete comment
postsRouter.delete("/:postId/comments/:commentId", (req, res) => {
    res.send("Received a DELETE HTTP method for comment");
});


export default postsRouter;
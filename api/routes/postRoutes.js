import express from "express";
const postsRouter = express.Router();
import { getPosts } from "../controllers/postsController.js";

postsRouter.get("/", getPosts);

postsRouter.post("/", (req, res) => {
    return res.send("Received a POST HTTP method");
} );

postsRouter.get("/:id", (req, res) => {
    return res.send("Received a GET ID HTTP method");
} );

postsRouter.put("/:id", (req, res) => {
    return res.send("Received a PUT HTTP method");
} );

postsRouter.delete("/:id", (req, res) => {
    return res.send("Received a DELETE HTTP method");
} );


export default postsRouter;
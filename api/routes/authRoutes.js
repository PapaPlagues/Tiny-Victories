import express from "express";
const authRouter = express.Router();

authRouter.post("/", (req, res) => {
    return res.send(`POST HTTP method on login`);
});


export default authRouter;
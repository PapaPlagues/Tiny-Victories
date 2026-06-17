import express from "express";
const authRouter = express.Router();
import { loginAuth } from "../controllers/authController";


authRouter.post("/register", (req, res) => {
    return res.send(`Register user`);
});

authRouter.post("/login", loginAuth);


export default authRouter;
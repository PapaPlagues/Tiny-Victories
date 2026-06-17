import express from "express";
const authRouter = express.Router();
import { loginAuth } from "../controllers/authController.js";

authRouter.post("/login", loginAuth);


export default authRouter;
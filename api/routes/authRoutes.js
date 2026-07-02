import express from "express";
const authRouter = express.Router();
import { loginAuth } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 min
  skipSuccessfulRequests: true, 
  message: {
    error: "Too many login attempts. Try again later."
  }
});


authRouter.post("/login", loginLimiter, loginAuth);


export default authRouter;
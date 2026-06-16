import "dotenv/config";
import express from "express";
import postsRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/posts", postsRouter);
app.use("/login", authRouter);


// Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        send(err);
    }

    console.log(`Server running on PORT ${PORT}`);
});
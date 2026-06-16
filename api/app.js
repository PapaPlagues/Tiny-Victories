import "dotenv/config";
import express from "express";
import postsRouter from "./routes/postRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/posts", postsRouter);


// Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        send(err);
    }

    console.log(`Server running on PORT ${PORT}`);
});
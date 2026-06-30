import "dotenv/config";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import multer from "multer";

const app = express();

// Middleware

// add more to cors later for security 
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

// Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Server error", err);
    }

    console.log(`Server running on PORT ${PORT}`);
});
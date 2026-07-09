import "dotenv/config";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import helmet from "helmet";


const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", 
  "http://localhost:3000",
]
app.use(cors({
  origin: function (origin, callback) {
    // allow tools like Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.get("/test-cloudinary", async (req, res) => {
    const result = await cloudinary.api.ping();
    res.json(result);
});

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
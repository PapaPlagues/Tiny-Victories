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
    process.env.FRONTEND_URL,
].filter(Boolean);

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

app.use(helmet({
    // Allow resources like images to be fetched from other origins (e.g., the public frontend)
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    "/uploads",
    express.static("uploads", {
        setHeaders(res) {
            // Allow images to be requested from other origins (e.g. public frontend)
            // This permits the <img src="http://.../uploads/..."> requests to succeed
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "X-Content-Type-Options",
                "nosniff"
            );
        }
    })
);

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



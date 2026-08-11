import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPaths = [
    path.resolve(__dirname, "../.env"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "api/.env"),
];

let envLoaded = false;
for (const envPath of envPaths) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
        envLoaded = true;
        break;
    }
}

if (!envLoaded) {
    console.warn("Failed to load .env for Cloudinary in api/lib/cloudinary.js");
}

const cloudinaryConfig = process.env.CLOUDINARY_URL
    ? { cloudinary_url: process.env.CLOUDINARY_URL, secure: true }
    : {
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
          secure: true,
      };

if (!cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.warn("⚠️ Cloudinary credentials missing or not loaded:", {
        CLOUDINARY_URL: Boolean(process.env.CLOUDINARY_URL),
        CLOUD_NAME: Boolean(process.env.CLOUD_NAME),
        CLOUD_API_KEY: Boolean(process.env.CLOUD_API_KEY),
        CLOUD_API_SECRET: Boolean(process.env.CLOUD_API_SECRET),
    });
}

cloudinary.config(cloudinaryConfig);

export default cloudinary;
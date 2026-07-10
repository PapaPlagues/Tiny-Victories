import fs from "fs";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// store temporarily in memory
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },

    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

export const processImage = async(req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        // check file signature
        const detectedType = await fileTypeFromBuffer(req.file.buffer);

        const allowedTypes = [
            "image/jpeg", 
            "image/png", 
            "image/webp"
        ];

        if (
            !detectedType ||
            !allowedTypes.includes(detectedType.mime)
        ) {
            return res.status(400).json({
                error: "Only JPEG, PNG, AND WEBP images are allowed."
            });
        }

        // Generate safe filename
        const filename = `${crypto.randomUUID()}.webp`;

        const filepath = path.join(
            uploadDir,
            filename
        );

        // Decode and recreate image
        // This removes hidden payloads
        await sharp(req.file.buffer)
            .resize({
                width: 1200,
                withoutEnlargement: true
            })
            .webp({
                quality: 85
            })
            .toFile(filepath);

        
        // Attach saved filename
        req.file.filename = filename;
        next();
    } catch(err) {
        console.error("IMAGE PROCESS ERROR:", err);

        return res.status(400).json({
            error: "Invalid image upload"
        });
    }
};

export default upload;
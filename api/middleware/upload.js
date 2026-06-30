import multer from "multer";

const storage = multer.memoryStorage();

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Invalid file type. Only JPEG, PNG, and WebP images are allowed."), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max
    }
});

export default upload;
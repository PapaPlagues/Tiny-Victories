import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    // get auth header value
    const authHeader = req.headers.authorization;

   if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
   }

   const token = authHeader.split(" ")[1]; // Bearer TOKEN

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // store user info
        next();

    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }

};
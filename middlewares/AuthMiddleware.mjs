import jwt from "jsonwebtoken";
import axios from "axios";

const JWT_ACCESS_SECRET = "imsoroushdeveloper";
const JWT_REFRESH_SECRET = "imdeveloper";

// Middleware to check access token
export const CheckAuth = (req, res, next) => {
    try {
        const accesstoken = req.cookies.AccessToken;

        if (!accesstoken) {
            return res.status(401).json({ error: "Access token is required." });
        }

        jwt.verify(accesstoken, JWT_ACCESS_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid access token." });
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
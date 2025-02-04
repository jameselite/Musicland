import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";

export const CheckAuth = (req, res, next) => {
    try {
        const accesstoken = req.cookies.AccessToken;

        if (!accesstoken) {
            return res.status(401).json({ error: "Access token is required.", success: false });
        }
        jwt.verify(accesstoken, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid access token.", success: false });
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false });
    }
};
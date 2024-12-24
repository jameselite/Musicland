import jwt from "jsonwebtoken";
const JWT_REFRESH_SECRET = "imdeveloper";
const JWT_ACCESS_SECRET = "imsoroushdeveloper";

export const NewToken = (req, res) => {
    try {
        const refreshtoken = req.cookies.RefreshToken;
        if (!refreshtoken) {
            return res.status(403).json({ message: "Refresh token is required" });
        }
        const user = jwt.verify(refreshtoken, JWT_REFRESH_SECRET);

        const new_access_token = jwt.sign({ email: user.email }, JWT_ACCESS_SECRET, { expiresIn: "15m" });
        
        return res.status(200).json({ token: new_access_token });

    } catch (err) {
        return res.status(403).json({ error: err.message });
    }
};
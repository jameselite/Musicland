import prisma from "../prismaClient.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

const JWT_ACCESS_SECRET = "imsoroushdeveloper";
const JWT_REFRESH_SECRET = "imdeveloper";

export const LoginUsers = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password ){
            throw new Error("Information should not be empty.");
        }
        const IsUserExist = await prisma.user.findUnique({ where: {email: email}});
        if(!IsUserExist){
            throw new Error("Email or password is wrong.");
        }
        const IsPasswordMatch = await bcrypt.compare(password, IsUserExist.password);
        if(!IsPasswordMatch){
            throw new Error("Email or password is wrong.");
        }
        const accesstoken = jwt.sign({ email: email}, JWT_ACCESS_SECRET, { expiresIn : '1m' });
        res.cookie("AccessToken", accesstoken, { httpOnly: true });

        const refreshtoken = jwt.sign({ email: email }, JWT_REFRESH_SECRET, { expiresIn : '90d' });
        res.cookie("RefreshToken", refreshtoken, { httpOnly: true });
        return res.json({ message : "User logged successfully." });
    }catch(err){
        return res.status(400).json({ error: err.message })
    }
}
export const LogoutUsers = (req, res) => {
    try{
        res.clearCookie("AccessToken");
        res.clearCookie("RefreshToken");

        return res.status(200).json({ message: "User logged out successfully."});
    }catch(err){
        return res.status(400).json({ error: err.message })
    }
}
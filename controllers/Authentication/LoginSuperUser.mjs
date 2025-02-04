import prisma from "../../prismaClient.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const LoginSuperUser = async (req, res) => {
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
        const accesstoken = jwt.sign({ email: email, isadmin: true }, process.env.JWT_ACCESS_SECRET, { expiresIn : '15m' });
        res.cookie("AccessToken", accesstoken, { httpOnly: true });

        const refreshtoken = jwt.sign({ email: email, isadmin: true }, process.env.JWT_REFRESH_SECRET, { expiresIn : '90d' });
        res.cookie("RefreshToken", refreshtoken, { httpOnly: true });
        return res.json({ message : "User logged successfully.", success: true });
    }catch(err){
        return res.status(400).json({ error: err.message, success: false })
    }
}
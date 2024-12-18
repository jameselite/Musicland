import prisma from "../prismaClient.mjs";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res) => {
    try{
        const { email, fullname, password } = req.body;
        if(!email || !fullname || !password){
            throw new Error("Information can not be empty.");
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });
        if(existingUser){
            throw new Error("User already exist.")
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const newuser = await prisma.user.create({ data: { 
            email: email,
            fullname: fullname,
            password: hashedpassword
        }})
        const res_user = {
            email: newuser.email,
            fullname: newuser.fullname
        }
        return res.status(201).json(res_user);
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}
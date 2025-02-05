import prisma from "../../prismaClient.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const AddSuperUser = async (req, res) => {
  try {
    const { email, fullname, password, adminsecret } = req.body;
    if (!email || !fullname || !password || !adminsecret) {
      throw new Error("Information can not be empty.");
    }
    if (adminsecret !== process.env.ADMINSECRET) {
      throw new Error("Access denied.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error("User already exist.");
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        password: hashedpassword,
      },
    });
    const res_user = {
      email: newuser.email,
      fullname: newuser.fullname,
    };
    return res.status(201).json({ res_user, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};

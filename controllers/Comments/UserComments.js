import prisma from "../../prismaClient.mjs";

export const UserComments = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });
    if (!user) throw new Error("User not found.");

    const allUserComments = await prisma.comment.findMany({
      where: { authorid: user.id },
    });
    if (allUserComments.length == 0)
      return res.status(200).json({ message: "No track found." });

    return res.status(200).json({ allUserComments, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};
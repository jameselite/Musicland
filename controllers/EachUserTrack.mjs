import prisma from "../prismaClient.mjs";

export const EachUserTrack = async (req, res) => {
  try {
    const req_user = await prisma.user.findUnique({
      where: { email: req.user.email },
      include: { tracks: true },
    });
    return res.status(200).json(req_user.tracks);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

import fs from "fs-extra";
import prisma from "../../prismaClient.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DeleteTrack = async (req, res) => {
  try {
    const trackid = req.params.id;
    if (!trackid) throw new Error("Track slug is not provided in URL.");

    const isFound = await prisma.track.findUnique({
      where: { slug: trackid },
      include: { author: true },
    });
    if (!isFound) throw new Error("Track not found.");

    if (isFound.author.email !== req.user.email || !req.user.isadmin)
      throw new Error("You are not the author.");

    await prisma.track.delete({ where: { slug: trackid } });

    const imagepath = path.join(__dirname, "uploads", isFound.picture);
    const trackpath = path.join(__dirname, "uploads", isFound.music);
    
    await fs.remove(imagepath);
    await fs.remove(trackpath);

    return res
      .status(200)
      .json({ message: "Track deleted successfully.", success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};
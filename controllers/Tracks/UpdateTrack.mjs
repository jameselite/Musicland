import slugify from "slugify";
import prisma from "../../prismaClient.mjs";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UpdateTrack = async (req, res) => {
  try {
    const trackid = req.params.id;
    if (!trackid) throw new Error("Track id is not in URL.");

    const findtrack = await prisma.track.findUnique({
      where: { slug: trackid },
    });
    if (!findtrack) throw new Error("Track not found.");

    if (findtrack.author.email !== req.user.email || !req.user.isadmin)
      throw new Error("You are not the author.");

    const { title, description, music, picture } = req.body;

    if (!title && !description && !music)
      throw new Error("Requested data should not be empty.");

    const data_vars = {};

    if (title) {
      const slug = slugify(title, { strict: true, lower: true });
      let newslug = slug;
      let count = 1;

      while (await prisma.track.findUnique({ where: { slug: newslug } })) {
        newslug = `${slug}-${count}`;
        count++;
      }

      data_vars.title = title;
      data_vars.slug = newslug;
    }

    if (description) {
      data_vars.description = description;
    }
    if (music) {
      data_vars.music = music;
    }
    if(picture){
        data_vars.picture = picture;
    }

    if (data_vars.picture) {
      picturePath = path.join(__dirname, "uploads", findtrack.picture);
      await fs.remove(picturePath);
    }

    if (data_vars.music) {
      musicPath = path.join(__dirname, "uploads", findtrack.music);
      await fs.remove(musicPath);
    }

    const newtrack = await prisma.track.update({
      where: { slug: trackid },
      select: {
        title: true,
        description: true,
        music: true,
        picture: true,
        slug: true,
        author: { select: { fullname: true } },
      },
      data: data_vars,
    });
    return res.status(200).json({ newtrack, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};
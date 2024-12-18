import slugify from "slugify";
import prisma from "../prismaClient.mjs";

export const CreateTrack = async (req, res) => {
  try {
    const { title, description, music } = req.body;
    let slug = await slugify(title, { lower: true, strict: true });
    let IsSameSlug = await prisma.track.findUnique({ where: { slug: slug } });
    const req_user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });
    let count = 0;
    let new_slug = slug;

    // Check if the slug already exists
    let existingTrack = await prisma.track.findUnique({ where: { slug: new_slug } });

    // Loop to find a unique slug
    while (existingTrack) {
      count++;
      new_slug = `${slug}-${count}`;
      existingTrack = await prisma.track.findUnique({ where: { slug: new_slug } });
    }
    const new_track = await prisma.track.create({
      data: {
        title: title,
        description: description,
        music: music,
        author: {
          connect: { id: req_user.id },
        },
        slug: new_slug,
      },
    });

    const res_json = {
      title: new_track.title,
      description: new_track.description,
      music: new_track.music,
      author: req_user.fullname,
      slug: new_track.slug,
    };

    return res.status(201).json(res_json);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

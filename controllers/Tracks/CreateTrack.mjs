import slugify from "slugify";
import prisma from "../../prismaClient.mjs";

export const CreateTrack = async (req, res) => {
  try {
    const { title, description, music, picture } = req.body;
    let slug = await slugify(title, { lower: true, strict: true });
    let IsSameSlug = await prisma.track.findUnique({ where: { slug: slug } });
    const req_user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });
    let count = 0;
    let new_slug = slug;

    let existingTrack = await prisma.track.findUnique({
      where: { slug: new_slug },
    });

    while (existingTrack) {
      count++;
      new_slug = `${slug}-${count}`;
      existingTrack = await prisma.track.findUnique({
        where: { slug: new_slug },
      });
    }
    const new_track = await prisma.track.create({
      data: {
        title: title,
        description: description,
        music: music,
        picture: picture || process.env.DEFAULT_PIC,
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
      picture: new_track.picture,
      author: req_user.fullname,
      slug: new_track.slug,
      like: new_track.like,
      success: true,
    };

    return res.status(201).json(res_json);
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};

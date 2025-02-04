import prisma from "../../prismaClient.mjs";

export const EachUserTrack = async (req, res) => {
  try {
    const req_user = await prisma.user.findUnique({
      where: { email: req.user.email },
      select: {
        tracks: {
          select: {
            title: true,
            description: true,
            music: true,
            slug: true,
            author: { select: { fullname: true }}
          },
        },
      },
    });

    if (!req_user || !req_user.tracks) {
      return res.status(404).json({ error: "No tracks found for this user.", success: false });
    }

    const res_tracks = req_user.tracks;

    return res.status(200).json({ res_tracks, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};

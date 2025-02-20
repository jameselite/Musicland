import prisma from "../../prismaClient.mjs";

export const UpdateComment = async (req, res) => {
  try {
    const { text } = req.body;

    const trackid = req.params.trackid;
    const commentid = req.params.commentid;

    if (!trackid) throw new Error("Track id not provided in URL.");
    if (!commentid) throw new Error("Comment id not provided in URL.");
    if (!text) throw new Error("Requested data can not be empty.");

    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
    });

    const track = await prisma.track.findUnique({ where: { slug: trackid } });
    if (!track) throw new Error("Track not found.");

    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentid), trackid: track.id },
    });
    if (!comment) throw new Error("Comment not found.");

    if (comment.authorid !== user.id && !req.user.isadmin)
      throw new Error("You are not the author.");

    const updateComment = await prisma.comment.update({
      where: { id: Number(commentid), authorid: user.id, trackid: track.id },
      data: { text: text },
      select: { id: true, text: true, author: { select: { fullname: true } } },
    });

    return res.status(200).json({ updateComment, success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message, success: false });
  }
};

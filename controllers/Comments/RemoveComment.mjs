import prisma from "../../prismaClient.mjs";

export const RemoveComment = async (req, res) => {

    try {
        
        const trackid = req.params.trackid;
        if(!trackid) throw new Error("Track ID not provided in URL.");

        const commentid = req.params.commentid;
        if(!commentid) throw new Error("Comment ID not provided in URL.");

        const thetrack = await prisma.track.findUnique({ where: { slug: trackid }});
        if(!thetrack) throw new Error("Track not found.");

        const currentuser = await prisma.user.findUnique({ where: { email: req.user.email }});
        if(!currentuser) throw new Error("User not found.");

        const iscommentexist = await prisma.comment.findUnique({ where: {id: Number(commentid), trackid: Number(thetrack.id), authorid: Number(currentuser.id)}});

        if(!iscommentexist) throw new Error("Comment not found.");
        if(iscommentexist.authorid !== currentuser.id) throw new Error("Access denied.");

        await prisma.comment.delete({ where: {id: Number(commentid), trackid: Number(thetrack.id), authorid: Number(currentuser.id)}});

        return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
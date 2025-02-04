import prisma from "../../prismaClient.mjs";

export const RemoveLike = async (req, res) => {
    
    try {
        
        const trackid = req.params.id;
        if(!trackid) throw new Error("Track ID not provided in URL.");

        const thetrack = await prisma.track.findUnique({ where: { slug: trackid }});
        if(!thetrack) throw  new Error("Track not found.");

        const currentuser = await prisma.user.findUnique({ where: { email: req.user.email }});
        if(!currentuser) throw new Error("User not found.");

        const thelike = await prisma.like.findUnique({ where: {trackid_authorid: { trackid: thetrack.id, authorid: currentuser.id }}});
        if(!thelike) throw new Error("You did not liked this track.");

        await prisma.like.delete({ where: {trackid_authorid: { authorid: currentuser.id, trackid: thetrack.id }}});

        return res.status(200).json({ message: "Like removed.", success: true });
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false })
    }
}
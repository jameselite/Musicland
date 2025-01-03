import prisma from "../../prismaClient.mjs";

export const AddLike = async (req, res) => {

    try {
        const Trackid = req.params.id;
        if(!Trackid) throw new Error("Track ID not provided in URL.");

        const CurrentUser = await prisma.user.findUnique({ where: { email: req.user.email }})
        const TheTrack = await prisma.track.findUnique({ where: { slug: Trackid }});

        if(!TheTrack) throw new Error("Track not found.");

        const IsLikeExist = await prisma.like.findUnique({ where: { trackid_authorid: { trackid: TheTrack.id, authorid: CurrentUser.id }}})
        
        if(IsLikeExist) throw new Error("You already liked this track");

        const new_like = await prisma.like.create({ data: { authorid: CurrentUser.id , trackid: TheTrack.id }});

        return res.status(200).json({ message: "Track liked."});
        
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
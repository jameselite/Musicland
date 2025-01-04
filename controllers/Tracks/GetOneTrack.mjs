import prisma from "../../prismaClient.mjs";

export const GetOneTrack = async (req, res) => {

    try {
        const trackid = req.params.id;

        if (!trackid) throw new Error("Track id in URL is empty");

        const trackfound = await prisma.track.findUnique({ where: { slug: trackid }, select: {
            title: true, description: true, music: true, slug: true, author: {select: {fullname: true}}, comments: { select: {text: true, author: {select: {fullname: true}}, created_at: true, id: true}}
        } });

        if (!trackfound) throw new Error("Track not found!");

        const thelikecount = await prisma.like.count({ where: { trackid: trackfound.id } });

        const findtrack = {...trackfound, ...{ likecount: thelikecount }}

        return res.status(200).json(findtrack);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
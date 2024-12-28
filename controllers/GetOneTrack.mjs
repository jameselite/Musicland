import prisma from "../prismaClient.mjs";

export const GetOneTrack = async (req, res) => {
    try {
        const trackid = req.params.id;

        if (!trackid) throw new Error("Track id in URL is empty");

        const trackfound = await prisma.track.findUnique({ where: { slug: trackid }, include: {author: true} });

        if (!trackfound) throw new Error("Track not found!");

        const likecount = await prisma.like.count({ where: { trackid: trackfound.id } });

        const findtrack = {
            title: trackfound.title,
            description: trackfound.description,
            slug: trackfound.slug,
            music: trackfound.music,
            author: { fullname: trackfound.author.fullname },
            likeCount: likecount 
        };

        return res.status(200).json(findtrack);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

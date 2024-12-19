import prisma from "../prismaClient.mjs";

export const GetOneTrack = async (req, res) => {
    try {
        const trackid = req.params.id;

        if(!trackid) throw new Error("Track id in URL is empty");

        const findtrack = await prisma.track.findUnique({ where: { slug: trackid },
        select: {title: true, description: true, slug: true, music: true, author: { select: {fullname: true}}}
        });

        if(!findtrack) throw new Error("Not found !");

        return res.status(200).json(findtrack);

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
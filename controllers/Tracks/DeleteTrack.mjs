import prisma from "../../prismaClient.mjs";

export const DeleteTrack = async (req, res) => {
    
    try {
        const trackid = req.params.id;
        if(!trackid) throw new Error("Track slug is not provided in URL.");

        const isFound = await prisma.track.findUnique({ where: { slug: trackid }, include: {author: true}});
        if(!isFound) throw new Error("Track not found.");

        if(isFound.author.email !== req.user.email) throw new Error("You are not the author.");

        await prisma.track.delete({ where: { slug: trackid}});

        return res.status(200).json({ message: "Track deleted successfully." });

    } catch (err) {
        
        return res.status(400).json({ error: err.message })
    }
}
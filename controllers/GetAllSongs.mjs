import prisma from "../prismaClient.mjs";

export const GetAllSongs = async (req, res) => {
    try {
        
        const allsongs = await prisma.track.findMany({
            select: {
                title: true,
                description: true,
                music: true,
                slug: true,
                author: true
            }
        })

        if(!allsongs){
            return res.status(200).json({ "message" : "There is no song." });
        }

        return res.status(200).json(allsongs)

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
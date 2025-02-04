import prisma from "../../prismaClient.mjs";

export const GetAllSongs = async (req, res) => {
    try {
        
        const allsongs = await prisma.track.findMany({
            select: {
                title: true,
                description: true,
                music: true,
                slug: true,
                author : { select: { fullname: true }}
            }
        })

        if(!allsongs){
            return res.status(200).json({ "message" : "There is no song.", success: true });
        }

        return res.status(200).json({ allsongs, success: true })

    } catch (err) {
        return res.status(400).json({ error: err.message, success: false });
    }
}
import prisma from "../../prismaClient.mjs";

export const ShowPlaylist = async (req, res) => {
    try {
        
        const CurrentUser = await prisma.user.findUnique({ where: { email: req.user.email }, include:{ playlist: true }
        });

        const ThePlaylist = await prisma.playlist.findUnique({ where: { authorid: CurrentUser.playlist.authorid }, select:{ tracks: { select: { title: true, description: true, music: true, slug: true, author: { select: { fullname:true }}}}}})

        return res.status(200).json({ ThePlaylist, success: true });
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false })
    }
}
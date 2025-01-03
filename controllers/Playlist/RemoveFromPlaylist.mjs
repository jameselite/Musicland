import prisma from "../../prismaClient.mjs";

export const RemoveFromPlaylist = async (req, res) => {
    
    try {
        
        const trackid = req.params.id;
        if(!trackid) throw new Error("Track ID not provided in URL.");

        const Thetrack = await prisma.track.findUnique({ where: { slug: trackid } })
        if(!Thetrack) throw new Error("Track not found.");

        const CurrentUser = await prisma.user.findUnique({ where: { email: req.user.email }});
        if(!CurrentUser) throw new Error("User not found.");

        const ThePlaylist = await prisma.playlist.findUnique({ where: { authorid: CurrentUser.id }})
        if(!ThePlaylist) throw new Error("Playlist not found.");

        await prisma.playlist.update({ where: { authorid : CurrentUser.id }, data: { tracks: { disconnect: { id: Thetrack.id }}}});

        return res.status(200).json({ message: ""})
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
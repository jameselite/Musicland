import prisma from "../../prismaClient.mjs";

export const AddToPlaylist = async (req, res) => {
    try {

        const trackid = req.params.id;
        if(!trackid) throw new Error("Track ID is not provided in URL.");

        const TheTrack = await prisma.track.findUnique({ where: {slug: trackid}});
        if(!TheTrack) throw new Error("Track not found.");

        const current_user = await prisma.user.findUnique({ where: { email: req.user.email } });

        const is_playlist_there = await prisma.playlist.findUnique({ where: { authorid: current_user.id }, include: { tracks: true }});

        if(!is_playlist_there){
            const makeplaylist = await prisma.playlist.create({
                data: {
                    author: { connect: { id: current_user.id }},
                    tracks: { connect: { id: TheTrack.id }}
                },
                include: { tracks: true, author: true }
            });
        }

        const is_songthere = is_playlist_there.tracks.some(track => track.id === TheTrack.id);
        if(is_songthere) throw new Error("Song already in playlist.");

        const user_playlist = await prisma.playlist.update({ where: {id: is_playlist_there.id }, include: {tracks: true}, data: { tracks: { connect: { id: TheTrack.id} }}});

        return res.status(201).json({ message: "Song added to playlist."})
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
import prisma from "../../prismaClient.mjs";

export const AddComment = async (req, res) => {
    try {
        
        const trackid = req.params.id;
        if(!trackid) throw new Error("Track ID not provided in the URL.");

        const thetrack = await prisma.track.findUnique({ where: { slug: trackid }});
        if(!thetrack) throw new Error("Track not found.");

        const currentuser = await prisma.user.findUnique({ where: { email: req.user.email }});
        if(!currentuser) throw new Error("User not found.");

        const textofcomment = req.body.text;

        const created = new Date();
        const year = created.getFullYear();
        const month = String(created.getMonth() + 1).padStart(2, '0');
        const day = String(created.getDay()).padStart(2, '0');

        const formated_date = `${year}-${month}-${day}`;

        const newcomment = await prisma.comment.create({ data: { trackid: thetrack.id, authorid: currentuser.id, text:  textofcomment, created_at: formated_date}});

        return res.status(201).json({ message: "Comment added." });
        } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}
export const TrackBodyCheck = (req, res, next) => {

    const { title, description, music } = req.body;

    if(!title) return res.status(400).json({ error: "Title should not be empty."});
    if(!description || description.length == 0) description == " "; 
    if(!music) return res.status(400).json({ error: "Music should not be empty."});

    if(typeof(title) != "string") return res.status(400).json({ error: "Title should be a string." })
    if(typeof(description) != "string") return res.status(400).json({ error: "Description should be a string." })
    if(typeof(music) != "string") return res.status(400).json({ error: "Music should be a string." })

    if(title.length < 6 || title.length > 250) return res.status(400).json({ error: "Title should be more than 6 character " });
    if(description.length > 500) return res.status(400).json({ error: "Description should not be more than 500 character." });

    next();

}
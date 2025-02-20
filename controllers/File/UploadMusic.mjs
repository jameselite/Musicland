export const UploadMusic = async (req, res) => {
    try {
        
        if(!req.file) {
            throw new Error("Requested file can not be empty.");
        }

        return res.status(200).json({ "URL" : `localhost:3000/uploads/${req.file.filename}`, success: true });
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false });
    }
}
export const UploadPicture = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error("Requested file cannot be empty.");
        }

        return res.status(200).json({ 
            URL: `http://localhost:3000/uploads/${req.file.filename}`, 
            success: true 
        });
    } catch (err) {
        return res.status(400).json({ 
            error: err.message, 
            success: false 
        });
    }
};

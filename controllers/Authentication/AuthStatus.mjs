export const AuthStatus = async (req, res) => {
    try {
        const res_object = {}

        const accesstoken = req.cookies.AccessToken;
        const refreshtoken = req.cookies.RefreshToken;

        if(accesstoken) res_object.accesstoken = true;
        if(refreshtoken) res_object.refreshtoken = true;

        return res.status(200).json({ res_object, success: true });
    } catch (err) {
        return res.status(400).json({ error: err.message, success: false })
    }
}
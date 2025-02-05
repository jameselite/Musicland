import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const NewToken = (req, res) => {
  try {
    const refreshtoken = req.cookies.RefreshToken;
    if (!refreshtoken) {
      return res
        .status(403)
        .json({ message: "Refresh token is required", success: false });
    }
    const user = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

    const new_access_token = jwt.sign(
      { email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({ token: new_access_token, success: true });
  } catch (err) {
    return res.status(403).json({ error: err.message, success: false });
  }
};

import jwt from "jsonwebtoken";
import axios from "axios";

const JWT_ACCESS_SECRET = "imsoroushdeveloper";
const JWT_REFRESH_SECRET = "imdeveloper";

export const RefreshAccess = async (req, res, next) => {
  try {
    const accesstoken = req.cookies.AccessToken;
    const refreshtoken = req.cookies.RefreshToken;

    // Check if access token is present
    if (!accesstoken) {
      // If access token is missing, check for refresh token
      if (!refreshtoken) {
        return res.status(401).json({ error: "Token is required." });
      }

      // Send the refresh token in the request to the new token endpoint
      const response = await axios.post("http://localhost:3000/api/auth/newtoken", {}, {
        headers: {
          Cookie: `RefreshToken=${refreshtoken}` // Include the refresh token from cookies
        }
      });

      // Check if the response contains a new access token
      if (response.data.token) {
        res.cookie("AccessToken", response.data.token, { httpOnly: true });
        return next(); // Proceed to the next middleware
      } else {
        throw new Error("There is a problem in refreshing the token.");
      }
    }

    // If access token is present, proceed to the next middleware
    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
import express from "express";
import AuthRoutes from "./routes/AuthRoutes.mjs";
import TackRoutes from "./routes/TrackRoutes.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRoutes);
app.use('/api/tracks', TackRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

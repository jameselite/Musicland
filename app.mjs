import express from "express";
import AuthRoutes from "./routes/AuthRoutes.mjs";
import TrackRoutes from "./routes/TrackRoutes.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { CheckAuth } from "./middlewares/AuthMiddleware.mjs";
import { UploadMusic } from "./controllers/File/UploadMusic.mjs";
import { UploadPicture } from "./controllers/File/UploadPicture.mjs";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use("/api/auth", AuthRoutes);
app.use("/api/tracks", TrackRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const musicFileFilter = (req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/aac'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Only audio files are allowed!'), false);
  }
};

const pictureFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Only image files are allowed!'), false);
  }
};

const uploadMusic = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 }, fileFilter: musicFileFilter });
const uploadPicture = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: pictureFileFilter });

app.post("/api/uploadmusic", CheckAuth, uploadMusic.single('file'), UploadMusic);
app.post("/api/uploadpicture", CheckAuth, uploadPicture.single('picture'), UploadPicture);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
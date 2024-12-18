import { Router } from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { TrackBodyCheck } from "../middlewares/TrackBodyCheck.mjs";
import { CreateTrack } from "../controllers/CreateTrack.mjs";
import { EachUserTrack } from "../controllers/EachUserTrack.mjs";
import { RefreshAccess } from "../middlewares/RefreshAccess.mjs";

const router = Router();

router.post('/create', RefreshAccess ,CheckAuth, TrackBodyCheck, CreateTrack);

router.post('/mytracks', RefreshAccess, CheckAuth, EachUserTrack);

export default router
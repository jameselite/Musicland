import { Router } from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { TrackBodyCheck } from "../middlewares/TrackBodyCheck.mjs";
import { CreateTrack } from "../controllers/CreateTrack.mjs";
import { EachUserTrack } from "../controllers/EachUserTrack.mjs";
import { GetAllSongs } from "../controllers/GetAllSongs.mjs";
import { GetOneTrack } from "../controllers/GetOneTrack.mjs";
import { UpdateTrack } from "../controllers/UpdateTrack.mjs";

const router = Router();

router.post('/create' ,CheckAuth, TrackBodyCheck, CreateTrack);

router.get('/', GetAllSongs);

router.get('/:id', GetOneTrack);

router.put('/update/:id',CheckAuth, UpdateTrack);

router.post('/mytracks', CheckAuth, EachUserTrack);

export default router.post('/')
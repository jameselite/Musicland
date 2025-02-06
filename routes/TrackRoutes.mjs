import { Router } from "express";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { TrackBodyCheck } from "../middlewares/TrackBodyCheck.mjs";
import { CreateTrack } from "../controllers/Tracks/CreateTrack.mjs";
import { EachUserTrack } from "../controllers/Tracks/EachUserTrack.mjs";
import { GetAllSongs } from "../controllers/Tracks/GetAllSongs.mjs";
import { GetOneTrack } from "../controllers/Tracks/GetOneTrack.mjs";
import { UpdateTrack } from "../controllers/Tracks/UpdateTrack.mjs";
import { DeleteTrack } from "../controllers/Tracks/DeleteTrack.mjs";
import { AddToPlaylist } from "../controllers/Playlist/AddToPlaylist.mjs";
import { ShowPlaylist } from "../controllers/Playlist/ShowPlaylist.mjs";
import { RemoveFromPlaylist } from "../controllers/Playlist/RemoveFromPlaylist.mjs";
import { AddLike } from "../controllers/Tracks/AddLike.mjs";
import { RemoveLike } from "../controllers/Tracks/RemoveLike.mjs";
import { AddComment } from "../controllers/Comments/AddComment.mjs";
import { RemoveComment } from "../controllers/Comments/RemoveComment.mjs";
import { SearchTracks } from "../controllers/Tracks/SearchTrack.mjs";
import { UserComments } from "../controllers/Comments/UserComments";

const router = Router();

router.post("/create", CheckAuth, TrackBodyCheck, CreateTrack);

router.get("/", GetAllSongs);

router.get("/:id", GetOneTrack);

router.put("/update/:id", CheckAuth, TrackBodyCheck, UpdateTrack);

router.delete("/delete/:id", CheckAuth, DeleteTrack);

router.post("/mytracks", CheckAuth, EachUserTrack);

router.post("/:id/toplaylist", CheckAuth, AddToPlaylist);

router.post("/myplaylist", CheckAuth, ShowPlaylist);

router.post("/:id/playlistdel", CheckAuth, RemoveFromPlaylist);

router.post("/:id/like", CheckAuth, AddLike);

router.post("/:id/removelike", CheckAuth, RemoveLike);

router.post("/:id/addcomment", CheckAuth, AddComment);

router.post("/:trackid/deletecomment/:commentid", CheckAuth, RemoveComment);

router.get("/search/:q", SearchTracks);

router.post("/usercomments", CheckAuth, UserComments);

export default router.post("/");
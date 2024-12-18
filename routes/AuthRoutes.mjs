import { Router } from "express";
import { RegisterUser } from "../controllers/RegisterUser.mjs";
import { LoginUsers, LogoutUsers } from "../controllers/LoginUsers.mjs";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { NewToken } from "../controllers/NewToken.mjs";
import { RefreshAccess } from "../middlewares/RefreshAccess.mjs";

const router = Router();

router.post('/register', RegisterUser);

router.post('/login', LoginUsers);

router.post('/logout', RefreshAccess, CheckAuth, LogoutUsers);

// router.post('/newtoken', NewToken);

export default router
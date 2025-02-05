import { Router } from "express";
import { RegisterUser } from "../controllers/Authentication/RegisterUser.mjs";
import {
  LoginUsers,
  LogoutUsers,
} from "../controllers/Authentication/LoginUsers.mjs";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { NewToken } from "../controllers/Authentication/NewToken.mjs";
import { AuthStatus } from "../controllers/Authentication/AuthStatus.mjs";

const router = Router();

router.post("/register", RegisterUser);

router.post("/login", LoginUsers);

router.post("/logout", CheckAuth, LogoutUsers);

router.post("/getnewtoken", NewToken);

router.post("/auth_status", AuthStatus);

export default router;

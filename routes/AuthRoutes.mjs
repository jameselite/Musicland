import { Router } from "express";
import { RegisterUser } from "../controllers/RegisterUser.mjs";
import { LoginUsers, LogoutUsers } from "../controllers/LoginUsers.mjs";
import { CheckAuth } from "../middlewares/AuthMiddleware.mjs";
import { NewToken } from "../controllers/NewToken.mjs";


const router = Router();


router.post('/register', RegisterUser);

router.post('/login', LoginUsers);

router.post('/logout', CheckAuth, LogoutUsers);

router.post("/getnewtoken", NewToken);


export default router
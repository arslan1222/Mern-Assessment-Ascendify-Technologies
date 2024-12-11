import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middelwares/authMiddelware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout);

export default router;
import { Router } from "express";
import { login, logout, signup } from "../controllers/authController";

const router:Router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

export default router;
import { Router } from "express";
import { userProfile } from "../controllers/userController";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";
import isUserAuthenticatedHandler from "../middleware/isUserAuthenticatedHandler";

const router:Router = Router();

router.post('/profile',isUserAuthenticatedHandler, userProfile);

export default router;
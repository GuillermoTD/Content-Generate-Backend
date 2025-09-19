import { Router } from "express";
import isUserAuthenticatedHandler from "../middleware/isUserAuthenticatedHandler";
import openAIController from "../controllers/openAIController";

const router:Router = Router();

router.post('/content-generate-api', isUserAuthenticatedHandler, openAIController);

export default router;
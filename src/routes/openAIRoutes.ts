import { Router } from "express";
import isUserAuthenticatedHandler from "../middleware/isUserAuthenticatedHandler";
import openAIController from "../controllers/openAIController";
import checkApiRequestLimit from "../middleware/checkApiRequestLimit";

const router: Router = Router();

router.post(
  "/content-generate-api",
  isUserAuthenticatedHandler,
  checkApiRequestLimit,
  openAIController
);

export default router;

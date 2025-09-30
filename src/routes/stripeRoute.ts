import { Router } from "express";
import stripePaymentController from "../controllers/stripePaymentController";
import isUserAuthenticatedHandler from "../middleware/isUserAuthenticatedHandler";



const router = Router();


router.post('/stripe', isUserAuthenticatedHandler, stripePaymentController)



export default router;
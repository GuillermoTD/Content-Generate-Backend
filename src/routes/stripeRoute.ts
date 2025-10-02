import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";
import handleStripePayment from "../middleware/handleStripePayment";
import isUserAuthenticatedHandler from "../middleware/isUserAuthenticatedHandler";
import { Router } from "express";

const router = Router();

const stripeRoute = router.post(
  "/checkout",
  isUserAuthenticatedHandler,
  errorHandlerMiddleware,
  handleStripePayment
);


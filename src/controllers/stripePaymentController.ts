import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Stripe from "stripe";
import paymentModel from "../models/Payments";

const stripePaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const { amount, suscriptionPlan } = req.body;
    const token = req.cookies.token;
    console.log(amount,suscriptionPlan)
    const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string);
    const user = req.user;

    //Validamos que se envian los campos en el body
    if(!amount && !suscriptionPlan){
        res.status(401).json({message:"amount and subscriptionPlan are required"});
        return;
    }

    //validamos usuario
    if (!user || !token) {
      res.status(403).json({ message: "Usuario no autenticado" });
      return;
    }

    // res.json("funciona")
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "usd",
        //metadata
        metadata: {
          userId: user?._id.toString(),
          userEmail: user?.email,
          suscriptionPlan,
        },
      });

      res.json({
        clientSecret: paymentIntent?.client_secret,
        paymentId:paymentIntent?.id,
        metada:paymentIntent?.metadata
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
  }
);

export default stripePaymentController;

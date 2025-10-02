import asyncHandler from "express-async-handler";
import Stripe from "stripe";

import { Response, Request } from "express";
require("dotenv").config(); //cargar variables de entorno


// Verificar que la variable de entorno exista
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
      "STRIPE_SECRET_KEY no está definida en las variables de entorno"
    );
}
//instanciamos la clase de stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const handleStripePayment = asyncHandler(
  async (req: Request, res: Response) => {
    //tomamos los parametros que el cliente debe enviar
    const { amount, suscriptionPlan } = req.body;

    //tomamos la informacion del usuario
    const user = req?.user;
    console.log(user);

    console.log(process.env.STRIPE_SECRET_KEY)

    //se crea un payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      //se agrega metadata para este pago
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        suscriptionPlan,
      },
    });

    //respondemos al cliente
    res.json({
      clientSecrets: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent.metadata,
    });
  }
);

export default handleStripePayment;

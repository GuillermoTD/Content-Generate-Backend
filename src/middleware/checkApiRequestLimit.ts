import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel";

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "No esta autorizado" });
    return;
  }
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(401).json({ message: "No esta autorizado" });
    return;
  }

  let requestLimit = 0;
  //validamos si el usuario esta en con un periodo de prueba activo
  if (!user.trialPeriod) {
    requestLimit = user?.monthlyRequestLimit;
  }
  //Si el usuario sobrepasa el limite de peticiones segun el plan que tiene le dara un error
  if (user.apiRequestCount >= user.monthlyRequestsCount) {
    res
      .status(403)
      .json({
        message:
          "Has alcanzado el límite de solicitudes por este mes. Por favor, actualiza tu suscripción para realizar más solicitudes.",
      });
    return;
  }

  next();
});

export default checkApiRequestLimit;

import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const isUserAuthenticatedHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // 1. Verificar si el token existe
  if (!req.cookies.token) {
    res.status(401).json({ message: "No esta autorizado" });
    return; //Detener la ejecución
  }

  try {
    // 2. Verificar el token
    const decodedToken = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // 3. Guardar al usuario en la propiedad user en el request para para consultar mas adelante
    req.user = await UserModel.findById(decodedToken?.id).select("-password");

    if (!req.user) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    // 4. Continuar con el siguiente middleware
    next();
  } catch (error) {
    // 5. Manejar errores de verificación del token
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Token no válido" });
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expirado" });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export default isUserAuthenticatedHandler;

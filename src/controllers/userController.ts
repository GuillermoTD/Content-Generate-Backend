import mongoose from "mongoose";
import { Request, Response } from "express";
import UserModel from "../models/userModel";
import asyncHandler from "express-async-handler";
import { request } from "http";
import Jwt from "jsonwebtoken";

export const userProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (req.cookies.token) {
      const decoded = Jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET as string
      ) as { id: string };
      req.user = await UserModel.findById(decoded.id).select("-password");
      console.log(decoded);
      res.status(200).json({ user: req.user });
      return;
    }

    // Verificar primero si existe el token
    // if (!req.cookies.token) {
    //   res.status(401).json({ message: "Usuario no autenticado" });
    //   return;
    // }
  } catch (error) {
    if (error instanceof Jwt.JsonWebTokenError) {
      //con esto validamos si el error tiene que ver con la libreria de jwt respecto a lo enviado en la peticion
      res.status(401).json({ message: "Token no válido" });
      return;
    } else if (error instanceof Jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expirado" });
      return;
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
      return;
    }
  }
});

/*posibles errores en el token*/
/*
-El token tiene un formato inválido

-La firma del token no coincide

-El token está malformado

-El algoritmo de verificación no coincide
*/

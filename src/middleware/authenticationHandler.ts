import { NextFunction } from "express";

const authenticationHandler = (req:Request, res:Response, next:NextFunction) => {
    //1. obtener el token

    //2. verificar el token
    //3. decodificar el token
    //4. buscar al usuario en la base de datos
    //5. si no sale el usuario limpiar la cookie y retornar un error 401 (no autorizado) si no agregarlo al res.locals 
    //6. continuar con el siguiente middleware con next()
}
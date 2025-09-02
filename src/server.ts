import express, { Application, Request, Response } from 'express';
import databaseConnect from './Database';

require('dotenv').config(); //cargar variables de entorno

const app: Application = express() //instancia de express

const PORT = process.env.PORT || 3000; //puerto de entorno a utilizar

//Middleware
app.use(express.json()); //para que el servidor entienda json
app.use(express.urlencoded({ extended: true })); //para que el servidor entienda datos de formularios

//Iniciar el servidor
app.listen(PORT, () => {
    databaseConnect();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
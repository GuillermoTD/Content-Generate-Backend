import express, { Application, Request, Response } from 'express';
import databaseConnect from './Database';
import app from './app';

require('dotenv').config(); //cargar variables de entorno

const PORT = process.env.PORT || 3000; //puerto de entorno a utilizar

//Iniciar el servidor
app.listen(PORT, () => {
    databaseConnect();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
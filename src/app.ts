import helmet from "helmet";
import cors from "cors";
import express, { Application,Response,Request } from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";
import openAIRoutes  from "./routes/openAIRoutes";
import dotnet from "dotenv";
import stripeRoute from "./routes/stripeRoute";

const app:Application = express();

app.use(express.json());//Permite que las solicitudes retornen json
app.use(express.urlencoded({ extended: true }));//Habilita la lectura de datos de formularios
app.use(cookieParser());

dotnet.config(); //Cargar variables de entorno
/*configuracion middlewares*/
app.use(helmet());// Seguridad basica para header http

app.use(cors({ //habilitamos CORS
  origin: 'http://localhost:3000', // o tu frontend
  credentials: true, // ← ESTO ES IMPORTANTE
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(morgan('combined')); //middleware para loguear peticiones




app.use(cookieParser());//Se habilita el envio y lectura de cookies


/*ROUTES*/
app.use('/api', authRoutes); //Rutas de autenticacion
app.use('/api', userRoutes)
app.use('/api', openAIRoutes);
app.use('/api', stripeRoute);



/*Middlewares*/
app.use(errorHandlerMiddleware);


export default app;

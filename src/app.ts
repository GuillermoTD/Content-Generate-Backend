import helmet from "helmet";
import cors from "cors";
import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";


const app:Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json()); //Permite que las solicitudes retornen json
app.use(express.urlencoded({ extended: true })); //Habilita la lectura de datos de formularios

app.use('/api', authRoutes);




export default app;//Rutas de prueba

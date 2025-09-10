import helmet from "helmet";
import cors from "cors";
import express, { Application,Response,Request } from "express";
import authRoutes from "./routes/authRoutes";


const app:Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json()); //Permite que las solicitudes retornen json
app.use(express.urlencoded({ extended: true })); //Habilita la lectura de datos de formularios

app.use('/api', authRoutes);
app.get('/',(req:Request,res:Response)=>{
    console.log("hola como se llama")
    res.json({
        message:"esto parece que funcionas"
    })
})

export default app;//Rutas de prueba

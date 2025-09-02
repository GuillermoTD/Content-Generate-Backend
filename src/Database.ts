import Mongoose from "mongoose";


const databaseConnect = async () => {
  try {
    //validar si la variable de entorno esta definida y reconocida por mongoose
    if (!process.env.MONGO_URL)
      throw new Error("No se ha definido la variable para base de datos");

    //se evita reconexion a la base de datos si ya estaba conectada
    if (Mongoose.connection.readyState === 1) {
      console.log("La base de datos ya esta conectada");
      return;
    }

     // Opciones recomendadas para la conexión
    const options = {
      serverSelectionTimeoutMS: 5000, //tiempo maximo para seleccionar un servidor para evitar que la aplicacion caiga
      socketTimeoutMS: 45000, //evita que la aplicacion caiga por timeout
      connectTimeoutMS: 10000 // Evita esperas infinitas en la conexión inicial
    };

    //conexion a la base de datos
    await Mongoose.connect(process.env.MONGO_URL as string,options);
    console.log("Base de datos conectada");

  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
  }
};

export default databaseConnect;

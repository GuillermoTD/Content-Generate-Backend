import Mongoose from 'mongoose';

const databaseConnect =async () => {
    try {
        await Mongoose.connect(process.env.MONGO_URL as string);
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);
    }
}

export default databaseConnect;
// Importacion del paquete
const mongoose = require('mongoose');

// asyn: Retorna toda esa funcion en promesa
const dbConnection = async () => {
    try {
        // await: Espere a que todo esto pase, eso me ayuda a trabakjar de manera sincrono a pesar de que sea un promesa
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true 
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

// Estoy exportando la funcion dbConnection
module.exports = {
    dbConnection
}
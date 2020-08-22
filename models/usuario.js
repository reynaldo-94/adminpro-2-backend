// Voy a extraer 2 cosas que s eencuentran ene le paquete de ongoose
const { Schema, model} = require('mongoose');

// Esto es la definicion de cada uno de los registro que va a estar dentro de la tabla de usuario
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() {
    // Instancia del objeto actual
    // Extraigo la version y el id que vienen en el objeto
    // Con esto no me muestra el id en la peticion GET
    const { __v, _id, password, ...object} = this.toObject();
    // para que me muestre, cambio de_id a uid
    object.uid = _id;
    return object;
});

// IMplemento el modelo
// con exports voy a exponer el modelo
// POr defecto mongoose le pone el plural a la coleccion, osea aprecera usuarios, aumentara una s
module.exports  = model( 'Usuario', UsuarioSchema )
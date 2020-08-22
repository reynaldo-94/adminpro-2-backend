// SI queremos crear uns servidor que reciba peticiones osea ya un servidor REST, ya lo tenemos con express
const express = require('express');
const cors = require('cors')
// con esto estoy leyenedo las varibles de entorno
require('dotenv').config();
// Como en el otro archivo lo exporto como un objeto lo pongo entre llaves
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Confugrar CORS
// El use es conocido como un midlleware, los midlleware no son mas que una funcion que se va a ejecutarm siempre para todas las lineas que sigan hacia abajo
// Siempre que ejecute algo va a pasar por aca
app.use(cors());

// Base de datos
dbConnection();

// Con esto lee todas las variables de entorno
// console.log(process.env);

// Rutas
// get: metodo que tiene la aplicacion de express
// ('/', callback)
// req: lo que se solicita
// response: lo que nuestro servidor va a responder al cliente que acabaa de solicitar algo a nuestro backend
// Usualmente cuando creamos uan API rest siempre va a ser en formato JSON

// mean_user
// fZt5LFEgLsk0Y9p1

app.get( '/', (req, res) => {

    // res.json({
    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    })
})

// Uso el puerto 400
// app.listen( 3000, () => {
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
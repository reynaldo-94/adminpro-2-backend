const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// Impotamos el modelo
const Usuario = require('../models/Usuario');

const getUsuarios = async(req, res) => {

    // llave : filtros, nombre: que campo quiero
    const usuario = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuario,
        // Este uid es lo que yo comparti en mi middleware
        uid: req.uid
    });
}

const crearUsuario = async (req, res = response) => {
    // Leo lo que me llega
    const { email, password } = req.body;

    try {

        // Busco el campo email
        // await:   que esto se respnda antes de continuar a la siguiente linea
        const existeEmail = await Usuario.findOne({ email })

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // Con solo esrto ya tengo ina instancia de mi clase
        const usuario = new Usuario ( req.body );

        // Encriptar contraseña
        // Generamos data de manera aleatoria
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Lo graba en la BD
        // Como es una promesa puede que lo haga suer rapido, o a vaces se puede demorar
        // Pongo await para que espere a que save termine y mejecute el res.json cuando termine de ejecutar el usuario.save
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarUsuario = async(req, res = response) => {

    // TODO Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        // const campos = req.body;
        const { password, google, email, ...campos }  = req.body;
        // Con esto ya no necesito hacer esto
        // Borro todo lo que yo no quiera grabar en BD, osea si esta el password y no quiero el password hago eso
        // delete campos.password ;
        // delete campos.google;

        // Pregunto si el usuario por BD es igual al email que viene en la req.body, si son iguales la persona no esta acutalizando el email, entonces podriamos extraerño y borrarlo de ahi
        // if (usuarioDB.email === req.body.email ) {
        if (usuarioDB.email !== email ) {
            // const existeEmail = await Usuario.findOne({ email: req.body.email })
            // const existeEmail = await Usuario.findOne({ email: email })
            const existeEmail = await Usuario.findOne({ email })
            // Siexiste significa que no voy a poder actualizar el emia
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,

                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        // Pongo el email que quiero actualizar
        campos.email = email;

        // findByIdAndUpdate(id, capos a actualizar)
        // new:true, le indico que siempre me regresa el nuevo resultado
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async(req, res = response) => {
    
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( uid );

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })    
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
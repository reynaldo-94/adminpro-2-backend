/*
    RUTA: api/usuarios
*/

const { Router } = require('express');
// Paquete en el cual tenemos el midlleware checl
const { check } = require('express-validator');

// Importo el midlleware
const { validarCampos } = require('../middlewares/validar-campos');

// IMporto
const{ getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Esto es lo que se va a ejecutara cunado alguien haga api/usuarios
// Separemos lo que esta dentro de la funcion en otro archivo(controlador)

// Implemento un middleware
router.get( '/', validarJWT, getUsuarios);

// Crear un nuevo usuario
// Implemento un middleware en el 2do argumento, si quiere poner varios lo pongo entre llaves cuadradoas
router.post( '/', 
    [      
        // Validaciones  
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        // Tiene que ser llamado despues de los check, llamamos al middleware personalizado
        validarCampos
    ]
    ,crearUsuario
);

router.put('/:id', 
    [
        validarJWT,
        // Validaciones  
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ]
    ,actualizarUsuario
);

router.delete('/:id',
    validarJWT
    ,borrarUsuario
);

module.exports = router;
const { response } = require('express')
const { validationResult } = require('express-validator')

// next : este next lo vamos a llamar si el middleware pasa, es decir continue con el siguiente paso
const validarCampos = (req, res, next ) => {

    // Atrapar todos los erroes que pasaron por el middleware validators check
    // Al pasar por el middleware de check va a crear en el req todo lo que es un arreglo de errores generados
    const errores = validationResult( req );
    // Si no esta vacio
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    // SI no hay errores ejecuta el next
    next();
   
}

module.exports = {
    validarCampos
}
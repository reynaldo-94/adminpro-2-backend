const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la aplicacion'
        });
    }

    try {
        // COmprueba si es correcto el token

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        console.log( uid );
    } catch (error) {
        // Usualmente se dispara este chatch cuando el token no es valido
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    console.log(token);

    next();
}

module.exports = {
    validarJWT
}
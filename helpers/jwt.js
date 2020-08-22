const jwt = require('jsonwebtoken')
const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        // Se recomienda no poner informacion sensible
        const payload = {
            uid,
        };
        // La funcion sign trabaja con callbacks
        // sign(lo que voy a firmar va a ser el payload; despues viene la palabra secreta que yo voyo a utiizar para firmar mis token si esto lo tienen otra persona va a poder firmar tokens como si hubiera sido firmado por mi servidor; va a relacionado a al duracion del token osea cuando expira)
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err)
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });

    });

}

module.exports = {
    generarJWT,
}
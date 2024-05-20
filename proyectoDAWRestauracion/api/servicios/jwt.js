// Modulos 
const jwt = require('jwt-simple');
const moment=require('moment');
const secret='clave_secreta';

// Metodos
exports.createToken=(user)=>{
    let payload={
        sub:user._id,
        nombre:user.nombre,
        apellidos:user.apellidos,
        email:user.email,
        rol:user.rol,
        imagen:user.imagen,
        iat:moment().unix(),
        exp:moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
};
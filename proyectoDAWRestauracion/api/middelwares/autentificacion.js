// Modulos 
const jwt = require('jwt-simple');
const moment=require('moment');
const secret='clave_secreta';

// Decodificar token
exports.ensureAuth=(req, res ,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la cabecera de autentificacion'})
    }

    let token=req.headers.authorization.replace(/['"]+/g,'');

    // Control error decodificado token
    try{
        var payload=jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'El token ha expirado'});
        }
    }catch(err){
        return res.status(404).send({message:'El token no es valido'});
    }

    req.user = payload;
    next();
};
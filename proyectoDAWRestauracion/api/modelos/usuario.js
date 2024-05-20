// Modulos
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Schema usuario
let UsuarioSchema=Schema({
    nombre: String,
    apellidos: String,
    email:String,
    contrasenya:String,
    rol:String,
    imagen:String
});

module.exports=mongoose.model('Usuario',UsuarioSchema);
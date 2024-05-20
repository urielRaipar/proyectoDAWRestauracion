// Modulos
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Schema artista
let ArtistaSchema=Schema({
    nombre: String,
    descripcion: String,
    imagen:String
});

module.exports=mongoose.model('Artista',ArtistaSchema);
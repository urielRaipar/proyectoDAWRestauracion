// Modulos
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Schema artista
let CancionSchema=Schema({
    numero: String,
    nombre: String,
    duracion:String,
    ficheroMP3:String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});

module.exports=mongoose.model('Cancion',CancionSchema);
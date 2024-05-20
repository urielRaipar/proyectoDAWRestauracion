// Modulos
const mongoose=require('mongoose');
const Schema=mongoose.Schema;


// Schema artista
let AlbumSchema=Schema({
    titulo: String,
    descripcion: String,
    anyo:Number,
    imagen:String,
    artista: {type: Schema.ObjectId, ref: 'Artista'}
});

module.exports=mongoose.model('Album',AlbumSchema);
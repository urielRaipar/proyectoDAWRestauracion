// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');
const album = require('../modelos/album');


// Mostrar cancion
function getSong(req,res){
    let songId=req.params.id;

    Cancion.findById(songId).populate({path: 'album'}).exec().then(song=>{
        if(!song){
            res.status(404).send({message:'La cancion no existe'});
        }else{
            res.status(200).send({song});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Añadir canciones
function saveCanciones(req,res){
    let song= new Cancion();

    let params=req.body;
    song.numero=params.numero;
    song.nombre=params.nombre;
    song.duracion=params.duracion;
    song.ficheroMP3=null;
    song.album=params.album;

    song.save().then(songStore=>{
        if(!songStore){
            res.status(404).send({message:'No se ha guardado la cancion'});
        }else{
            res.status(200).send({song:songStore});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Mostrar todas las canciones por album&global
function getSongs(req,res){
    let albumId=req.params.album;

    if(!albumId){
        var find=Cancion.find({}).sort('numero');
    }else{
        var find=Cancion.find({album:albumId}).sort('numero');
    }

    find.populate({
        path: 'album',
        populate:{
            path:'artista',
            model:'Artista'
        }
    }).exec().then(songs=>{
        if(!songs){
            res.status(404).send({message:'No hay canciones'});
        }else{
            res.status(200).send({songs});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })

}

// Actualizar cancion
function updateSong(req,res){
    let songId=req.params.id;
    let update=req.body;

    Cancion.findByIdAndUpdate(songId,update).then(songUpdate=>{
        if(!songUpdate){
            res.status(404).send({message:'La cancion no se ha actualizado correctamente'});
        }else{
            res.status(200).send({songs:songUpdate});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })

}

// Eliminar cancion
function deleteSong(req,res){
    let songId=req.params.id;
    console.log(songId)
    Cancion.findByIdAndDelete({_id:songId}).then(songRemove=>{
        if(!songRemove){
            res.status(404).send({message:'La cancion no se ha borrado correctamente'});
        }else{
            res.status(200).send({songs:songRemove});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Subir fichero de audio
function subirAudio(req,res){
    let songId = req.params.id;
    let file_name = 'No subido...';

    if (req.files && req.files.ficheroMP3) {
        let file_path = req.files.ficheroMP3.path;
        let file_name = path.basename(file_path);
        let ext_split = file_name.split('.');
        let file_ext = ext_split[ext_split.length - 1].toLowerCase();

        if (file_ext === 'mp3' || file_ext === 'ogg') {
            Cancion.findByIdAndUpdate(songId, { ficheroMP3: file_name })
                .then(songUpdated => {
                    if (!songUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar la canción' });
                    } else {
                        res.status(200).send({ song: songUpdated });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: 'Error al subir el audio', error: err });
                });
        } else {
            res.status(400).send({ message: 'Extensión del archivo no válida' });
        }
    } else {
        res.status(400).send({ message: 'No se ha subido ningún fichero de audio...' });
    }
}

module.exports = {
    subirAudio
 }
 
 // Mostrar fichero de audio
 function mostrarAudio(req,res){
     let songFile=req.params.audioFile;
     let path_file='./uploads/canciones/'+songFile;
 
     fs.exists(path_file,exists=>{
         if(exists){
             res.sendFile(path.resolve(path_file));
         }else{
             res.status(200).send({message:'No existe el audio...'})
         }
     }); 
 }


module.exports={
    getSong,
    saveCanciones,
    getSongs,
    updateSong,
    deleteSong,
    subirAudio,
    mostrarAudio
}
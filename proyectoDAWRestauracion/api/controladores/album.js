// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');
const album = require('../modelos/album');

// Mostrar album
function getAlbum(req,res){
    let albumId=req.params.id;

    Album.findById(albumId).populate({path:'artista'}).exec().then(album=>{
        if(!album){
            res.status(404).send({message:'No existe el album'});
        }else{
            res.status(200).send({album});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Guardar album
function saveAlbum(req,res){
    let album=new Album();
    let params =req.body;
    album.titulo=params.titulo;
    album.descripcion=params.descripcion;
    album.anyo=params.anyo;
    album.imagen=params.imagen;
    album.artista=params.artista;


    album.save().then(albumStored=>{
        if(!albumStored){
            res.status(404).send({message:'No se ha guardado el album'});
        }else{
            res.status(200).send({album:albumStored});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Mostrar todos los albums de un artista
function getAlbums(req,res){
    let artistId=req.params.artist;

    if(!artistId){
        // Sacar todos los albums de la base de datos
        var find=Album.find({}).sort('titulo');
    }else{
        // Sacar los albums de un artista concreto de la base de datos
        var find=Album.find({artista:artistId}).sort('anyo');
    }

    find.populate({path:'artista'}).exec().then(albums=>{
        if(!albums){
            res.status(404).send({message:'No hay albums'});
        }else{
            res.status(200).send({albums});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}


// Mostrar todos los albums
function getAlbumsP(req,res){
    if(req.params.page){
        var page=req.params.page;
    }else{
        var page=1;
    }
    let itemsPerPage=4;

    Album.find().sort('nombre').paginate(page, itemsPerPage).then((album,total)=>{
        if(!album){
            res.status(404).send({message:'No hay albums'});
        }else{
            return res.status(200).send({
                total_items:total,
                albums:album
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}

// Actualizar album
function updateAlbum(req,res){
    let albumId=req.params.id;
    let update=req.body;

    Album.findByIdAndUpdate(albumId,update).then(albumUpdated=>{
        if(!albumUpdated){
            res.status(404).send({message:'No se ha actualizado el album'});
        }else{
            res.status(200).send({album:albumUpdated});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en el servidor'});
    })
}

// Borrar album
function deleteAlbum(req,res){
    let albumId=req.params.id;

    Album.findByIdAndDelete({_id:albumId}).then(albumRemoved=>{
        if(!albumRemoved){
            res.status(404).send({message: 'El album no ha sido eliminado'});
        }else{

            Cancion.find({album:albumRemoved._id}).deleteMany().then(songRemoved=>{
                if(!songRemoved){
                    res.status(404).send({message: 'La cancion no ha sido eliminada'});
                }else{
                    res.status(200).send({album:albumRemoved});
                }
            })
            .catch(err=>{
                res.status(500).send({message: 'Error al eliminar la cancion'});
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error al eliminar el album'});
    })
}

// Subir imagen album
function uploadImage(req,res){
    let albumId = req.params.id;
    let file_name = 'No subido...';

    if (req.files && req.files.imagen) {
        let file_path = req.files.imagen.path;
        let file_name = path.basename(file_path);
        let ext_split = file_name.split('.');
        let file_ext = ext_split[ext_split.length - 1].toLowerCase();

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif') {
            Album.findByIdAndUpdate(albumId, { imagen: file_name })
                .then(albumUpdated => {
                    if (!albumUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar la imagen del álbum' });
                    } else {
                        res.status(200).send({ album: albumUpdated });
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: 'Error al subir la imagen', error: err });
                });
        } else {
            res.status(400).send({ message: 'Extensión del archivo no válida' });
        }
    } else {
        res.status(400).send({ message: 'No se ha subido ninguna imagen...' });
    }
}

module.exports = {
    uploadImage
 }
 
 // Mostrar imagen album
 function getImageFile(req,res){
     let imageFile=req.params.imageFile;
     let path_file='./uploads/albums/'+imageFile;
 
     fs.exists(path_file,exists=>{
         if(exists){
             res.sendFile(path.resolve(path_file));
         }else{
             res.status(200).send({message:'No existe la imagen...'})
         }
     }); 
 }
 


module.exports={
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile,
    getAlbumsP
}
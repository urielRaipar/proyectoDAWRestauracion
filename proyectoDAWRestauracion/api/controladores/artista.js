// Modulos
const path=require('path');
const fs =require('fs');
const Artista=require('../modelos/artista');
const Album=require('../modelos/album');
const Cancion=require('../modelos/cancion');
const mongoosePaginate=require('mongoose-pagination');
const album = require('../modelos/album');

// Mostrar artista
function getArtist(req,res){
    let artistId=req.params.id;

    Artista.findById(artistId).then(artist=>{
        if(!artist){
            res.status(404).send({message:'El artista no existe'});
        }else{
            res.status(200).send({artist});
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}

// Mostrar todos los artistas
function getArtists(req,res){
    if(req.params.page){
        var page=req.params.page;
    }else{
        var page=1;
    }
    let itemsPerPage=4;

    Artista.find().sort('nombre').paginate(page, itemsPerPage).then((artist,total)=>{
        if(!artist){
            res.status(404).send({message:'No hay artistas'});
        }else{
            return res.status(200).send({
                total_items:total,
                artists:artist
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:'Error en la peticion'});
    })
}

// Guardar artista 
function saveArtist(req,res){
    let artist= new Artista();

    let params=req.body;
    artist.nombre=params.nombre;
    artist.descripcion=params.descripcion;
    artist.imagen='null';

    artist.save().then(artistStored=>{
        if(!artistStored){
            res.status(404).send({message: 'El artista no ha sido guardado'});
        }else{
            res.status(200).send({artist:artistStored})
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error al guardar el artista'})
    })
}

// Actualizar artista
function updateArtist(req,res){
    let artistId=req.params.id;
    let update=req.body;

    Artista.findByIdAndUpdate(artistId,update).then(artistUpdated=>{
        if(!artistUpdated){
            res.status(404).send({message: 'El artista no ha sido actualizado'});
        }else{
            res.status(200).send({artist:artistUpdated})
        }
    })
    .catch(err=>{
        res.status(500).send({message: 'Error en la actualizacion'});
    })
}

// Borrar artistas
function deleteArtist(req, res){
    let artistId=req.params.id;

    Artista.findByIdAndDelete({_id:artistId}).then(artistRemoved=>{
        if(!artistRemoved){
            res.status(404).send({message: 'El artista no ha sido eliminado'});
        }else{
            Album.find({artist: artistRemoved._id}).deleteMany().then(albumRemoved=>{
                if(!albumRemoved){
                    res.status(404).send({message: 'El album no ha sido eliminado'});
                }else{

                    Cancion.find({album:albumRemoved._id}).deleteMany().then(songRemoved=>{
                        if(!songRemoved){
                            res.status(404).send({message: 'La cancion no ha sido eliminada'});
                        }else{
                            res.status(200).send({artist:artistRemoved});
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
    })
    .catch(err=>{
        res.status(500).send({message: 'Error en el borrado'});
    })
}

// Subir imagenes de artista
function uploadImage(req,res){
    let artistId = req.params.id;
    let file_name = 'No subido...';

    if (req.files && req.files.imagen) {
        let file_path = req.files.imagen.path;
        let file_name = path.basename(file_path);
        let ext_split = file_name.split('.');
        let file_ext = ext_split[ext_split.length - 1].toLowerCase();

        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif') {
            Artista.findByIdAndUpdate(artistId, { imagen: file_name })
                .then(artistUpdated => {
                    if (!artistUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar la imagen de usuario' });
                    } else {
                        res.status(200).send({ artist: artistUpdated });
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

// Mostrar imagen de artista
function getImageFile(req,res){
    let imageFile=req.params.imageFile;
    let path_file='./uploads/artistas/'+imageFile;

    fs.exists(path_file,exists=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe la imagen...'})
        }
    }); 
}


module.exports={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}
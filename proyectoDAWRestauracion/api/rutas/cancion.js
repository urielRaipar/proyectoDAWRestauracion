// Modulos 
const express=require('express');
const CancionController=require('../controladores/cancion');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/canciones'});

// Rutas
api.get('/cancion/:id',md_auth.ensureAuth,CancionController.getSong);
api.post('/cancion',md_auth.ensureAuth,CancionController.saveCanciones);
api.get('/canciones/:album?',md_auth.ensureAuth,CancionController.getSongs);
api.put('/cancion/:id',md_auth.ensureAuth,CancionController.updateSong);
api.delete('/cancion/:id',md_auth.ensureAuth,CancionController.deleteSong);
api.post('/subir-fichero-audio/:id',[md_auth.ensureAuth,md_upload],CancionController.subirAudio);
api.get('/get-fichero-audio/:audioFile',CancionController.mostrarAudio);

module.exports=api;
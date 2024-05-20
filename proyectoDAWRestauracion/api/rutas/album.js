// Modulos 
const express=require('express');
const AlbumController=require('../controladores/album');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/albums'});

// Rutas
api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);
api.get('/albumsP/:page?',md_auth.ensureAuth,AlbumController.getAlbumsP);
api.put('/album/:id',md_auth.ensureAuth,AlbumController.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth,md_upload],AlbumController.uploadImage);
api.get('/get-image-album/:imageFile',AlbumController.getImageFile);

module.exports=api;
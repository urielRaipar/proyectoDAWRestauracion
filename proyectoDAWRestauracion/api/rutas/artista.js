// Modulos 
const express=require('express');
const ArtistController=require('../controladores/artista');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/artistas'});

// Rutas
api.get('/artista/:id',md_auth.ensureAuth,ArtistController.getArtist);
api.post('/artista',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artistas/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/artista/:id',md_auth.ensureAuth,ArtistController.updateArtist);
api.delete('/artista/:id',md_auth.ensureAuth,ArtistController.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth,md_upload],ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile',ArtistController.getImageFile);

module.exports=api;
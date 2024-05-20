// Modulos
const express=require('express');
const UserController=require('../controladores/usuario');
const api=express.Router();
const md_auth=require('../middelwares/autentificacion');
const multipart=require('connect-multiparty');
const md_upload=multipart({uploadDir:'./uploads/usuarios'});

// Rutas
api.get('/mostrarUsuarios',md_auth.ensureAuth,UserController.getUsuarios);
api.post('/registro',UserController.guardarUsuario);
api.post('/login',UserController.loginUsuario);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);
api.delete('/usuario/:id',md_auth.ensureAuth,UserController.deleteUsuario);
api.put('/update-rol/:id',md_auth.ensureAuth,UserController.updateRol);
api.put('/update-password/:id',md_auth.ensureAuth,UserController.updatePassword);

module.exports=api;


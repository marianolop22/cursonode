'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); //para subir archivos
var md_updload = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.get('/user/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/user/register', UserController.saveUser);
api.post('/user/login', UserController.loginUser);
api.put('/user/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/user/upload-image-user/:id', [md_auth.ensureAuth, md_updload], UserController.updloadImage);
api.get('/user/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;
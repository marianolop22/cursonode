'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); //para subir archivos
var md_updload = multipart({ uploadDir: './uploads/albums' });

var api = express.Router();

api.post('/album/save-album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.post('/album/get-album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/album/get-albums/:id?', md_auth.ensureAuth, AlbumController.getAlbums);
api.delete('/album/delete-album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.put('/album/update-album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.post('/album/upload-image-album/:id', [md_auth.ensureAuth, md_updload], AlbumController.updloadImage);
api.get('/album/get-image-album/:imageFile', AlbumController.getImageFile);

module.exports = api;
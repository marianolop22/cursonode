'use strict'

var express = require('express');
var Artistontroller = require('../controllers/artist');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); //para subir archivos
var md_updload = multipart({ uploadDir: './uploads/artists' });

var api = express.Router();

api.post('/artist/save-artist', md_auth.ensureAuth, Artistontroller.saveArtist);
api.post('/artist/get-artist/:id', md_auth.ensureAuth, Artistontroller.getArtist);
api.get('/artist/get-artists/:page?', md_auth.ensureAuth, Artistontroller.getArtists);
api.put('/artist/update-artist/:id', md_auth.ensureAuth, Artistontroller.updateArtist);
api.delete('/artist/delete-artist/:id', md_auth.ensureAuth, Artistontroller.deleteArtist);
api.post('/artist/upload-image-artist/:id', [md_auth.ensureAuth, md_updload], Artistontroller.updloadImage);
api.get('/artist/get-image-artist/:imageFile', Artistontroller.getImageFile);

module.exports = api;
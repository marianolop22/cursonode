'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty'); //para subir archivos
var md_updload = multipart({ uploadDir: './uploads/songs' });

var api = express.Router();

api.post('/song/save-song', md_auth.ensureAuth, SongController.saveSong);
api.post('/song/get-song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/song/get-songs/:id?', md_auth.ensureAuth, SongController.getSongs);
api.put('/song/update-song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/delete-song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/song/upload-file-song/:id', [md_auth.ensureAuth, md_updload], SongController.updloadFile);
api.get('/song/get-file-song/:songFile', SongController.getSongFile);

module.exports = api;
'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(req, res) {

    var songId = req.params.id;

    Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'La cancion no existe' });
            } else {
                res.status(200).send(song);
            }
        }
    });
}


function saveSong(req, res) {

    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, song) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la cancionalbum ' + err });
        } else {
            if (!song) {
                res.status(404).send({ message: 'Error al guardad la cancion' });
            } else {
                res.status(200).send({ song });
            }
        }
    });
}


function getSongs(req, res) {

    var find;

    if (req.params.id) {
        find = Song.find({ album: req.params.id }).sort('number');
    } else {
        find = Song.find().sort('name');
    }

    find.populate({
        path: 'album',
        populate: { path: 'artist', model: 'Artist' }
    }).exec((err, songs) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });

        } else {
            if (songs.length == 0) {
                res.status(404).send({ message: 'no hay canciones' })
            } else {
                return res.status(200).send({ songs });
            }
        }
    });
}


function updateSong(req, res) {

    var songId = req.params.id;
    var update = req.body;

    Song.findOneAndUpdate({ _id: songId }, update, (err, song) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'error al actualizar cancion' })
            } else {
                return res.status(200).send({ song });
            }
        }
    });
}


function deleteSong(req, res) {

    var songId = req.params.id;

    Song.findOneAndDelete({ _id: songId }, (err, song) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!song) {
                res.status(404).send({ message: 'error al borrar album' })
            } else {
                return res.status(200).send({ song });
            }
        }
    });
}


function updloadFile(req, res) {

    var songId = req.params.id;
    var file_name = 'No subido.....';

    if (req.files) {

        console.log(req.files);
        var file_path = req.files.file.path;
        file_name = file_path.split('\\')[2];

        Song.findOneAndUpdate({ _id: songId }, { file: file_name }, (err, song) => {

            if (err) {
                res.status(500).send({ message: 'error al actualizar' });
            } else {
                if (!song) {
                    res.status(404).send({ message: 'error en actualizar' });
                } else {
                    res.status(200).send({ message: 'actualizado bien' });
                }
            }
        })
    } else {
        res.status(200).send({ message: 'no has subido arhivo' });
    }
}


function getSongFile(req, res) {

    var songFile = req.params.songFile;

    fs.exists('./uploads/songs/' + songFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/songs/' + songFile));
        } else {
            res.status(404).send({ message: 'no existe el archivo' });
        }
    })
}

module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    updloadFile,
    getSongFile
};
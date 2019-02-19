'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {

    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!artist) {
                res.status(404).send({ message: 'El artista no existe' });
            } else {
                res.status(200).send(artist);
            }
        }
    })
}

function saveArtist(req, res) {

    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = params.image;

    artist.save((err, artist) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el artista ' + err });
        } else {
            if (!artist) {
                res.status(404).send({ message: 'Error al guardad el artista' });
            } else {
                res.status(200).send({ artist });
            }
        }
    });
}


function getArtists(req, res) {

    var page;
    var itemsPerPage = 3;

    if (req.params.page) {
        page = req.params.page;
    } else {
        page = 1;
    }

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, totalItems) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });

        } else {
            if (!artists) {
                res.status(404).send({ message: 'no hay artistas' })
            } else {
                return res.status(200).send({ totalItems, artists });
            }
        }
    });
}


function updateArtist(req, res) {

    var artistId = req.params.id;
    var update = req.body;

    Artist.findOneAndUpdate({ _id: artistId }, update, (err, artist) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!artist) {
                res.status(404).send({ message: 'error al actualizar artista' })
            } else {
                return res.status(200).send({ artist });
            }
        }
    });
}


function deleteArtist(req, res) {

    var artistId = req.params.id;

    Artist.findOneAndDelete({ _id: artistId }, (err, artist) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!artist) {
                res.status(404).send({ message: 'error al borrar artista' })
            } else {
                //return res.status(200).send({ artist });

                Album.find({ artist: artistId }).remove((err, album) => {

                    if (err) {
                        res.status(500).send({ message: 'Error en la peticion' });
                    } else {
                        if (!album) {
                            res.status(404).send({ message: 'error al borrar album' })
                        } else {
                            Song.find({ album: album._id }).remove((err, song) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error en la peticion' });
                                } else {
                                    if (!song) {
                                        res.status(404).send({ message: 'error al borrar cancion artista' })
                                    } else {
                                        return res.status(200).send({ artist, album, song });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}


function updloadImage(req, res) {

    var artistId = req.params.id;
    var file_name = 'No subido.....';

    if (req.files) {

        var file_path = req.files.image.path;
        file_name = file_path.split('\\')[2];

        Artist.findOneAndUpdate({ _id: artistId }, { image: file_name }, (err, artist) => {

            if (err) {
                res.status(500).send({ message: 'error al actualizar' });
            } else {
                if (!artist) {
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


function getImageFile(req, res) {

    var imageFile = req.params.imageFile;

    fs.exists('./uploads/artists/' + imageFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/artists/' + imageFile));
        } else {
            res.status(404).send({ message: 'no existe el archivo' });
        }
    })
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    updloadImage,
    getImageFile
};
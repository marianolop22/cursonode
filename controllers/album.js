'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res) {

    var albumId = req.params.id;

    Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!album) {
                res.status(404).send({ message: 'El artista no existe' });
            } else {
                res.status(200).send(album);
            }
        }
    });




}


function saveAlbum(req, res) {

    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = params.image;
    album.artist = params.artist;

    album.save((err, album) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el album ' + err });
        } else {
            if (!album) {
                res.status(404).send({ message: 'Error al guardad el artista' });
            } else {
                res.status(200).send({ album });
            }
        }
    });
}


function getAlbums(req, res) {

    //var artistId;
    //var page;
    // var itemsPerPage = 3;

    // if (req.params.page) {
    //     page = req.params.page;
    // } else {
    //     page = 1;
    // }

    var find;

    if (req.params.id) {
        find = Album.find({ artist: req.params.id }).sort('year');
    } else {
        find = Album.find().sort('title');
    }

    find.populate({ path: 'artist' }).exec((err, albums) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });

        } else {
            if (!albums) {
                res.status(404).send({ message: 'no hay artistas' })
            } else {
                return res.status(200).send({ albums });
            }
        }
    });


    // find.populate({ path: 'artist' }).paginate(page, itemsPerPage).exec((err, albums, totalItems) => {

    //     if (err) {
    //         res.status(500).send({ message: 'Error en la peticion' });

    //     } else {
    //         if (!albums) {
    //             res.status(404).send({ message: 'no hay artistas' })
    //         } else {
    //             return res.status(200).send({ totalItems, albums });
    //         }
    //     }
    // });


}


function updateAlbum(req, res) {

    var albumId = req.params.id;
    var update = req.body;

    Album.findOneAndUpdate({ _id: albumId }, update, (err, album) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!album) {
                res.status(404).send({ message: 'error al actualizar artista' })
            } else {
                return res.status(200).send({ album });
            }
        }
    });
}


// function deleteArtist(req, res) {

//     var artistId = req.params.id;

//     Artist.findOneAndDelete({ _id: artistId }, (err, artist) => {

//         if (err) {
//             res.status(500).send({ message: 'Error en la peticion' });
//         } else {
//             if (!artist) {
//                 res.status(404).send({ message: 'error al borrar artista' })
//             } else {
//                 //return res.status(200).send({ artist });

//                 Album.find({ artist: artistId }).remove((err, album) => {

//                     if (err) {
//                         res.status(500).send({ message: 'Error en la peticion' });
//                     } else {
//                         if (!album) {
//                             res.status(404).send({ message: 'error al borrar album' })
//                         } else {
//                             Song.find({ album: album._id }).remove((err, song) => {
//                                 if (err) {
//                                     res.status(500).send({ message: 'Error en la peticion' });
//                                 } else {
//                                     if (!song) {
//                                         res.status(404).send({ message: 'error al borrar cancion artista' })
//                                     } else {
//                                         return res.status(200).send({ artist, album, song });
//                                     }
//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         }
//     });
// }


// function updloadImage(req, res) {

//     var artistId = req.params.id;
//     var file_name = 'No subido.....';

//     if (req.files) {

//         var file_path = req.files.image.path;
//         file_name = file_path.split('\\')[2];

//         Artist.findOneAndUpdate({ _id: artistId }, { image: file_name }, (err, artist) => {

//             if (err) {
//                 res.status(500).send({ message: 'error al actualizar' });
//             } else {
//                 if (!artist) {
//                     res.status(404).send({ message: 'error en actualizar' });
//                 } else {
//                     res.status(200).send({ message: 'actualizado bien' });
//                 }
//             }
//         })
//     } else {
//         res.status(200).send({ message: 'no has subido arhivo' });
//     }
// }


// function getImageFile(req, res) {

//     var imageFile = req.params.imageFile;

//     fs.exists('./uploads/artists/' + imageFile, (exists) => {
//         if (exists) {
//             res.sendFile(path.resolve('./uploads/artists/' + imageFile));
//         } else {
//             res.status(404).send({ message: 'no existe el archivo' });
//         }
//     })
// }

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums
};
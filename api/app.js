'use strict'

var express = require('express'); //servidor
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

});


//rutas base
app.use('/api', [user_routes, artist_routes, album_routes, song_routes]);

// app.get('/pruebas', (req, res) => {
//     res.status(200).send ({message:'bienvenidos al curso'});
// });

module.exports = app;
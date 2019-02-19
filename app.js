'use strict'

var express = require('express'); //servidor
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras

//rutas base
app.use('/api', [user_routes, artist_routes, album_routes]);

// app.get('/pruebas', (req, res) => {
//     res.status(200).send ({message:'bienvenidos al curso'});
// });

module.exports = app;
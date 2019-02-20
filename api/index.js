'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977; //puerto de nuestro servidor

mongoose.Promise = global.Promise;

//mongodb+srv://admin:09Dici78@cluster0-qm9lb.mongodb.net/curso_node
//mongodb://localhost:27017/curso_node

mongoose.connect('mongodb://localhost:27017/curso_node', { useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("la base de datos está corriendo correctament");

        app.listen(port, function() {
            console.log("el Servidor del api rest escuchando en http://localhost:" + port);
        })
    }
});
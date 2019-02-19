'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del api de node'
    });
}

function saveUser(req, res) {

    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        //encriptar y guardar
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //guardar el usuario
                user.save((err, response) => {

                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario ' + err });
                    } else {
                        if (!response) {
                            res.status(404).send({ message: 'Error al guardad el usuario' });
                        } else {
                            res.status(200).send({ user: response });
                        }
                    }
                });
            } else {
                res.status(500).send('faltan datos');
            }
        });
    } else {
        res.status(500).send('introduce la contraseña');
    }
}

function loginUser(req, res) {

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, user.password, (err, check) => {

                    if (check) {
                        //devolver los datos del usuario logueado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {

                            res.status(200).send({ message: 'login existoso', user });
                        }

                    } else {
                        res.status(404).send({ message: 'contrasela incorrecta' });
                    }
                })
            }
        }
    });
}

function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;

    console.log(req.user);

    User.findOneAndUpdate({ _id: userId }, update, (err, user) => {

        if (err) {
            res.status(500).send({ message: 'error al actualizar', err });
        } else {
            if (!user) {
                res.status(404).send({ message: 'error al actualizar', err });
            } else {
                res.status(200).send({ user });
            }
        }
    })

}

function updloadImage(req, res) {

    var userId = req.params.id;
    var file_name = 'No subido.....';

    if (req.files) {

        var file_path = req.files.image.path;
        file_name = file_path.split('/')[2];

        User.findOneAndUpdate({ _id: userId }, { image: file_name }, (err, user) => {

            if (err) {
                res.status(500).send({ message: 'error al actualizar' });
            } else {
                if (!user) {
                    res.status(404).send({ message: 'error en actualizar' });
                } else {
                    res.status(200).send({ image: file_name, user });
                }
            }
        })
    } else {
        res.status(200).send({ message: 'no has subido arhivo' });
    }

}

function getImageFile(req, res) {

    var imageFile = req.params.imageFile;

    fs.exists('./uploads/users/' + imageFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/users/' + imageFile));
        } else {
            res.status(404).send({ message: 'no existe el archivo' });
        }
    })


}



module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    updloadImage,
    getImageFile
};
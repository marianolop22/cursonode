'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_node123';

function ensureAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    var payload;

    try {

        payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Sesion vencida' });
        }

    } catch (ex) {
        console.log(ex);
        return res.status(404).send({ message: 'Hubo un error' });
    }

    req.user = payload;

    next();
}

module.exports = {
    ensureAuth
};
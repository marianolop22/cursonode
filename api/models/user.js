'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: { type: String, index: { unique: true } },
    password: String,
    role: String,
    image: String
});

//UserSchema.index({ name: 1, surname: 1 }, { unique: true });


module.exports = mongoose.model('User', UserSchema);
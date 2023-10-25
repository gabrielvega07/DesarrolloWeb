var mongoose = require('mongoose');

var LibroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    añoPublicacion: String,
    isbn: String,
    genero: String
});

module.exports = mongoose.model('libros', LibroSchema);

const librosModel = require('../models/librosModel');

// Obtener todos los libros
function obtenerLibros(req, res) {
    librosModel.find({})
        .then(libros => {
            if (libros.length) {
                return res.status(200).send({ libros });
            }
            return res.status(204).send({ mensaje: "No se ha encontrado nada" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al consultar la información: ${e}` });
        });
}

// Obtener libro por título
function obtenerLibroPorTitulo(req, res) {
    const titulo = req.params.titulo;
    librosModel.findOne({ titulo: new RegExp(`^${titulo}$`, 'i') })
        .then(libro => {
            if (libro) {
                return res.status(200).send({ libro });
            }
            return res.status(204).send({ mensaje: "Libro no encontrado" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar el libro: ${e}` });
        });
}

// Crear nuevo libro
function crearLibro(req, res) {
    new librosModel(req.body).save()
        .then(info => {
            return res.status(200).send({
                mensaje: "El libro ha sido añadido con exito", info });
        })
        .catch(e => {
            return res.status(400).send({ mensaje: `Error al guardar el libro: ${e}` });
        });
}

module.exports = {
    obtenerLibros,
    obtenerLibroPorTitulo,
    crearLibro
};

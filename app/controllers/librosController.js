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

// Actualizar libro por título
function actualizarLibroPorTitulo(req, res) {
    const titulo = req.params.titulo;
    librosModel.findOneAndUpdate(
        { titulo: new RegExp(`^${titulo}$`, 'i') },
        req.body,
        { new: true }
    )
        .then(libro => {
            if (libro) {
                return res.status(200).send({ libro });
            }
            return res.status(404).send({ mensaje: "Libro no encontrado para actualizar" });
        })
        .catch(e => {
            return res.status(400).send({ mensaje: `Error al actualizar: ${e}` });
        });
}

// Eliminar libro por título
function eliminarLibroPorTitulo(req, res) {
    const titulo = req.params.titulo;
    librosModel.findOneAndDelete({ titulo: new RegExp(`^${titulo}$`, 'i') })
        .then(libro => {
            if (libro) {
                return res.status(200).send({ mensaje: "Libro eliminado correctamente" });
            }
            return res.status(404).send({ mensaje: "Libro no encontrado para eliminar" });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: `Error al eliminar: ${e}` });
        });
}

// Leer capítulo por título y número
function leerCapituloPorTitulo(req, res) {
    const titulo = req.params.titulo;
    const capituloNum = parseInt(req.params.capitulo);

    librosModel.findOne({ titulo: new RegExp(`^${titulo}$`, 'i') })
        .then(libro => {
            if (!libro) {
                return res.status(404).send({ mensaje: "Libro no encontrado" });
            }
            const capitulo = libro.capitulos.find(c => c.numero === capituloNum);
            if (!capitulo) {
                return res.status(404).send({ mensaje: "Capítulo no encontrado" });
            }
            return res.status(200).send({ capitulo });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: `Error al leer el capítulo: ${e}` });
        });
}


module.exports = {
    obtenerLibros,
    crearLibro,
    obtenerLibroPorTitulo,
    
};

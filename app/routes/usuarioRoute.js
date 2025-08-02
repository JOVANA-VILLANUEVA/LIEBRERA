const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.buscarTodo)
    .post('/', usuariosController.agregarUsuario)// se deja exactamente igual, por que depende de get y post
    .get('/:key/:value',usuariosController.buscarUsuario,usuariosController.mostrarUsuario)// buscar valor, next sirve parac decirle al codigo que ejecute ambas funciones
    .delete('/:key/:value',usuariosController.buscarUsuario,usuariosController.eliminarUsuario)// eliminar usuario
    .put('/:key/:value',usuariosController.buscarUsuario,usuariosController.usuarioActualizar)

module.exports = router;
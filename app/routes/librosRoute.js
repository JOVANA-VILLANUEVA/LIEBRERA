const express = require('express')
const router = express.Router()
//controlador de joyas
const librosController = require('../controllers/librosController')

router.get('/', librosController.obtenerLibros)
router.post('/', librosController.crearLibro)

module.exports=router
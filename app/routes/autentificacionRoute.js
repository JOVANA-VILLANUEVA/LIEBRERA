const express = require('express');
const router = express.Router();
const { registro, login } = require('../controllers/autentificacionController');
const autenticar = require('../config/autentificacionTokens');


router.post('/registro', registro);
router.post('/login', login);


router.get('/perfil', autenticar, (req, res) => {
    res.json({ 
        mensaje: "Perfil protegido",
        usuario: req.usuario // Datos del token
    });
});
module.exports = router;
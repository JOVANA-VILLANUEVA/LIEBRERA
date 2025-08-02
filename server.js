//Configuracion.js
const CONFIG = require('./app/config/configuracion')
 
//App.js
const app = require('./app/app')

//Conexion.js
const conexion = require('./app/config/conexion')
conexion.conect()

//Ruta de token
const authRoute = require('./app/routes/autentificacionRoute');

app.listen(CONFIG.PORT, ()=>{
    console.log(`Aplicacion corriendo en puerto ${CONFIG.PORT}`);
})

//PARTE DE JOVANA
require('dotenv').config();
app.use('/auth', authRoute);


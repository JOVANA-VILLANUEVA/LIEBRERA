//Configuracion.js
const CONFIG = require('./app/config/configuracion');

//App.js
const app = require('./app/app');

//Swagger
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');


//Conexion.js
const conexion = require('./app/config/conexion')
conexion.conect()

app.listen(CONFIG.PORT, () => {
    console.log(`Aplicacion corriendo en puerto ${CONFIG.PORT}`);
})




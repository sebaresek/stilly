//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PORT } = process.env;

// Sincroniza los modelos con la base de datos y verifica la conexión
conn.sync({ force: false })
  .then(() => {
    // Verifica la conexión a la base de datos
    return conn.authenticate();
  })
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    
    // Inicia el servidor
    server.listen(PORT, () => {
      console.log('Escuchando en el puerto:', PORT);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

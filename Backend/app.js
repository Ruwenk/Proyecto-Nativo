const express = require('express')
const app = express()
const port = 3005
// apertura de libreria mysql2//
const mysql = require('mysql2/promise');
// se crea la conexion a la base de datos login//
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login', async (req, res) => {   // req=request, peticion; res= response, respuesta// 
  const datos = req.query;
// realizar peticiones a la base de datos login //
try {
  const [results, fields] = await connection.query(
    // consultar existencia de usuario //
    "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
    [datos.usuario, datos.clave]  // datos a utilizar//
  );
  // impresion de respuesta en el navegador 
  if (results. length > 0){
      res. status(200).send ("Inicio de sesion correcto")
  } else {
      res.status (401).send ("Datos incorrectos")
  }
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}
  
  })
  app.get('/validar', (req, res) => {
    res.send('Usuario Validado!')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

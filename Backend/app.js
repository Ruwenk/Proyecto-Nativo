const express = require('express');
const app = express();
const port = 3005;
const mysql = require('mysql2/promise');


app.use(express.json()); // Middleware para analizar JSON en las solicitudes

// Crear la conexión a la base de datos nativo
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nativo',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', async (req, res) => {
  const datos = req.query;
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM usuarios WHERE identificacion = ? AND contraseña = ?",
      [datos.Identificacion, datos.contraseña]
    );
    if (results.length > 0) {
      res.status(200).send("Inicio de sesión correcto");
    } else {
      res.status(401).send("Datos incorrectos");
    }
    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
});

app.post('/registrar', async (req, res) => {
  const { id, name, email, contraseña, ciudad, direccion, telefono } = req.body;
  console.log('Datos recibidos:', req.body); // Verificar datos recibidos
  try {
    const [result] = await connection.query(
      "INSERT INTO usuarios (identificacion, nombre completo, email, contraseña, ciudad, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, email, contraseña, ciudad, direccion, telefono]
    );
    res.status(201).send("Registro exitoso."); // Mensaje que se envía al cliente
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al registrar usuario.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

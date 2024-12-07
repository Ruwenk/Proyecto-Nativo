const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 4000;

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gato2024',
    database: 'proyecto'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para servir el formulario HTML de registro
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/HTML/registro.html'));
});

// Ruta para servir el formulario de inicio de sesión HTML
app.get('/Frontend/HTML/inicio.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/HTML/inicio.html'));
});

// Ruta para manejar el formulario de registro
app.post('/registro', (req, res) => {
    const { Usuario, numero, name, email, password, ciudad, direccion, telefono } = req.body;

    const query = 'INSERT INTO usuarios (tipo_usuario, documento, nombre, email, contraseña, ciudad, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [Usuario, numero, name, email, password, ciudad, direccion, telefono], (err, result) => {
        if (err) {
            res.status(500).send('Error al registrar el usuario');
            console.error(err);
            return;
        }
        res.send('Registro exitoso');
    });
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { documento, contraseña, usuario } = req.body;

    const query = 'SELECT * FROM usuarios WHERE documento = ? AND contraseña = ? AND tipo_usuario = ?';
    
    db.query(query, [documento, contraseña, usuario], (err, result) => {
        if (err) {
            res.status(500).send('Error en el servidor');
            console.error(err);
            return;
        }

        if (result.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Correo o contraseña incorrectos');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

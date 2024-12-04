const express = require('express');
const cors = require('cors');

const app = express();

// Middleware para manejar datos JSON
app.use(express.json());
app.use(cors({ origin: '*' }));

// Base de datos simulada (usuarios registrados)
const users = [
    { username: 'DerixV', password: 'password123' },
    { username: 'testUser', password: 'testPass' },
];

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validar si se enviaron las credenciales
    if (!username || !password) {
        return res.status(400).send({ error: 'Faltan credenciales' });
    }

    // Buscar usuario en la base de datos simulada
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Inicio de sesión exitoso
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
    } else {
        // Error de autenticación
        res.status(401).send({ error: 'Error de autenticación' });
    }
});

// Iniciar el servidor
const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en todas las interfaces en el puerto ${PORT}`);
});

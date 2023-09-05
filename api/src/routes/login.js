const express = require('express');
const router = express.Router();
const { login } = require('../constrollers/login');
const { postUser } = require('../constrollers/users'); // Importa la función postUser

router.post('/', login);
router.post('/register', postUser); // Agrega el nuevo manejador de ruta POST

module.exports = router;

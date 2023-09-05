const express = require('express');
const router = express.Router();

const { getUser, updateUser } = require('../constrollers/users'); // Importa la función postUser

router.get('/:email', getUser);
router.put('/:userId/:newFirstName/:newLastName/:newEmail/:newCity/:newAddress/:newPostalCode/:newPhoneNumber', updateUser)

module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para agregar un usuario
router.post('/new/add', userController.addUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/get/all', userController.getAllUsers);
router.get('/get/:id', userController.getUser)
router.put('/update/:id', userController.updateUser)

module.exports = router;

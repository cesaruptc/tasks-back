const express = require('express');
const { addTask } = require('../controllers/taskController');
const router = express.Router();

// Ruta para agregar una tarea
router.post('/', addTask);

module.exports = router;

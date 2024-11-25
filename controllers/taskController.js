const taskService = require('../services/taskService');

// Crear una nueva tarea
const addTask = async (req, res) => {
    const { user_id, title } = req.body;

    try {
        const result = await taskService.createTask(user_id, title);
        res.status(200).json({ message: 'Task added successfully!', task: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTask };

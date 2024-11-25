const userService = require('../services/userService');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Llamamos a userService.createUser pasando el objeto correctamente
        const result = await userService.createUser({ name, email, password });
        res.status(200).json({ message: 'User added successfully!', user: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userService.deleteUser(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await userService.getUser(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await userService.updateUser(id, updateData);
        res.status(200).json({ message: 'User updated successfully!', user: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { addUser, deleteUser, getAllUsers, getUser, updateUser};

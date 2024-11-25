require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON

// Usamos las rutas
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

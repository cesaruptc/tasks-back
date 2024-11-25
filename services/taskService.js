const supabase = require('../config/supabase');

// Crear una nueva tarea
const createTask = async (user_id, title) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([
            { user_id, title }
        ]);

    if (error) throw new Error(error.message);

    return data;
};

module.exports = { createTask };

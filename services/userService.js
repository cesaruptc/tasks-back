const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

// Inicializar el cliente de Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Esta función crea un nuevo usuario
async function createUser({ name, email, password }) {
    // Verifica que los datos sean correctos
    if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
    }

    // Verificar si el email ya está registrado
    const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email); // Elimina .single() para permitir múltiples resultados

    // Agregar logs para verificar la respuesta de Supabase
    console.log("Existing User Data:", existingUser);
    console.log("Error on user check:", userError);

    if (existingUser && existingUser.length > 0) {
        throw new Error('Email is already registered');
    }

    if (userError) {
        throw new Error(userError.message);
    }

    // Cifrado de la contraseña
    const saltRounds = 10;  // Número de rondas de salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserción en la base de datos
    const { data, error } = await supabase
        .from('users')
        .insert([
            { name, email, password: hashedPassword }
        ])
        .select(); // Usamos .select() para asegurarnos de que recibimos los datos del usuario creado

    if (error) {
        throw new Error(error.message);
    }

    // Verificar si 'data' contiene resultados y devolver el usuario creado
    if (data && Array.isArray(data) && data.length > 0) {
        return {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
            created_at: data[0].created_at
        };  // Retorna una respuesta más limpia
    } else {
        throw new Error('User not created');
    }
}

// Función para eliminar un usuario
async function deleteUser(userId) {
    // Verifica si el ID del usuario está presente
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Verificar si el usuario existe en la base de datos
    const { data, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single(); // Solo esperamos un resultado

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    if (!data) {
        throw new Error('User not found');
    }

    // Eliminar el usuario
    const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

    if (deleteError) {
        throw new Error(deleteError.message);
    }

    return { message: 'User deleted successfully' };
}

async function getAllUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*'); // Selecciona todos los usuarios

    if (error) throw new Error(error.message);
    return data; // Devuelve la lista de usuarios
}

async function getUser(userId) {
    // Verifica si el ID del usuario está presente
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Verificar si el usuario existe en la base de datos
    const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId).single();

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    if (!data) {
        throw new Error('User not found');
    }

    return data;
}

async function updateUser(userId, updateData) {
    // Validate input
    if (!userId) {
        throw new Error("User ID is required");
    }

    // If updating password, hash it
    if (updateData.password) {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    // Update user in Supabase
    const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        throw new Error('User not found or no updates made');
    }

    // Return the updated user (excluding sensitive information)
    return {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        created_at: data[0].created_at
    };
}

module.exports = { createUser, deleteUser, getAllUsers, getUser, updateUser };

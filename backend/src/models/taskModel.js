import pool from '../config/database.js';

export const TaskModel = {
  // Obtener todas las tareas
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return rows;
  },

  // Obtener una tarea por ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  // Crear nueva tarea
  create: async (task) => {
    const { title, description, completed = false } = task;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [title, description, completed]
    );
    return { id: result.insertId, ...task };
  },

  // Actualizar tarea
  update: async (id, task) => {
    const { title, description, completed } = task;
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id]
    );
    return { id, ...task };
  },

  // Eliminar tarea
  delete: async (id) => {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return true;
  }
};
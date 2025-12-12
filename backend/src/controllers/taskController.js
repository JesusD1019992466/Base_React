import { TaskModel } from '../models/taskModel.js';

export const TaskController = {
  // GET /api/tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  },

  // GET /api/tasks/:id
  getTaskById: async (req, res) => {
    try {
      const task = await TaskModel.getById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la tarea' });
    }
  },

  // POST /api/tasks
  createTask: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      const newTask = await TaskModel.create({
        title,
        description: description || '',
        completed: completed || false
      });
      
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la tarea' });
    }
  },

  // PUT /api/tasks/:id
  updateTask: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      const updatedTask = await TaskModel.update(req.params.id, {
        title,
        description: description || '',
        completed: completed || false
      });
      
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
  },

  // DELETE /api/tasks/:id
  deleteTask: async (req, res) => {
    try {
      await TaskModel.delete(req.params.id);
      res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
  }
};
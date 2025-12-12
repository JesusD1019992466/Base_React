import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const taskService = {
  // Obtener todas las tareas
  getAll: async () => {
    const response = await api.get('/');
    return response.data;
  },

  // Obtener una tarea por ID
  getById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Crear nueva tarea
  create: async (task) => {
    const response = await api.post('/', task);
    return response.data;
  },

  // Actualizar tarea
  update: async (id, task) => {
    const response = await api.put(`/${id}`, task);
    return response.data;
  },

  // Eliminar tarea
  delete: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  }
};
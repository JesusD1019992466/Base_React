import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS para producción
const allowedOrigins = [
  'http://localhost:5173',
  'https://tu-app-frontend.vercel.app' // Actualiza esto después
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El origen CORS no está permitido';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Datos en memoria (para Railway, luego cambiamos a DB)
let tasks = [
  { 
    id: 1, 
    title: 'Tarea de ejemplo', 
    description: 'Esta tarea viene de Railway', 
    completed: false,
    created_at: new Date().toISOString()
  }
];

let currentId = 1;

// Rutas
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const newTask = {
    id: ++currentId,
    title,
    description: description || '',
    completed: false,
    created_at: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body
  };

  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Tarea eliminada' });
});

// Health check para Railway
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'todo-backend'
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Tareas en producción',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend en producción en puerto ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
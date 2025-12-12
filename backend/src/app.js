import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Lista de Tareas funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
});
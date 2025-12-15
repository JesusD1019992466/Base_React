const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

// ✅ RUTA DIRECTA SIN API
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Falta el título' });
  }

  res.status(201).json({
    message: 'Tarea creada correctamente',
    task: { id: 1, title }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto: ${PORT}`);
});

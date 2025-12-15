const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // ✅ ahora sí existe

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

// Ejemplo de ruta que usa la DB
app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto: ${PORT}`);
});
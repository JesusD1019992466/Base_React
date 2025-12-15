require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ===========================
   VERIFICAR / CREAR TABLA
=========================== */
db.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    done TINYINT(1) DEFAULT 0,
    created_at DATETIME
  )
`, (err) => {
  if (err) {
    console.error('❌ Error verificando tabla tasks:', err.message);
  } else {
    console.log('✅ Tabla "tasks" lista para usar');
  }
});

/* ===========================
   RUTA BASE
=========================== */
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

/* ===========================
   OBTENER TODAS LAS TAREAS
=========================== */
app.get('/tasks', (req, res) => {
  db.query(
    'SELECT * FROM tasks ORDER BY created_at DESC',
    (err, results) => {
      if (err) {
        console.error('❌ Error obteniendo tasks:', err.message);
        return res.status(500).json([]);
      }
      res.json(results || []);
    }
  );
});

/* ===========================
   CREAR TAREA
=========================== */
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Título inválido' });
  }

  const createdAt = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  db.query(
    'INSERT INTO tasks (title, done, created_at) VALUES (?, 0, ?)',
    [title.trim(), createdAt],
    (err, result) => {
      if (err) {
        console.error('❌ Error creando task:', err.message);
        return res.status(500).json({ error: 'Error creando task' });
      }

      db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [result.insertId],
        (err2, rows) => {
          if (err2 || !rows.length) {
            console.error('❌ Error leyendo task creada:', err2?.message);
            return res.status(500).json({ error: 'Error leyendo task' });
          }
          res.status(201).json(rows[0]);
        }
      );
    }
  );
});

/* ===========================
   ACTUALIZAR TAREA
=========================== */
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.query(
    'SELECT * FROM tasks WHERE id = ?',
    [id],
    (err, rows) => {
      if (err) {
        console.error('❌ Error buscando task:', err.message);
        return res.status(500).json({ error: 'Error del servidor' });
      }

      if (!rows.length) {
        return res.status(404).json({ error: 'Task no encontrada' });
      }

      const current = rows[0];

      const newTitle =
        typeof title === 'string' && title.trim()
          ? title.trim()
          : current.title;

      const newDone =
        typeof done === 'boolean'
          ? done ? 1 : 0
          : current.done;

      db.query(
        'UPDATE tasks SET title = ?, done = ? WHERE id = ?',
        [newTitle, newDone, id],
        (err2) => {
          if (err2) {
            console.error('❌ Error actualizando task:', err2.message);
            return res.status(500).json({ error: 'Error actualizando task' });
          }

          db.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id],
            (err3, updated) => {
              if (err3 || !updated.length) {
                console.error('❌ Error leyendo task actualizada:', err3?.message);
                return res.status(500).json({ error: 'Error leyendo task' });
              }
              res.json(updated[0]);
            }
          );
        }
      );
    }
  );
});

/* ===========================
   ELIMINAR TAREA
=========================== */
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.query(
    'DELETE FROM tasks WHERE id = ?',
    [id],
    (err) => {
      if (err) {
        console.error('❌ Error eliminando task:', err.message);
        return res.status(500).json({ error: 'Error eliminando task' });
      }
      res.status(204).end();
    }
  );
});

/* ===========================
   404 CONTROLADO
=========================== */
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

/* ===========================
   INICIAR SERVIDOR
=========================== */
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en puerto ${PORT}`);
  console.log(`📁 Base de datos: ${process.env.DB_NAME || 'No configurada'}`);
});

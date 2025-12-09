import { pool } from "../db.js";

// GET ─ Obtener todas las tareas
export const obtenerTareas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tareas ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// POST ─ Crear tarea
export const crearTarea = async (req, res) => {
  try {
    const { texto } = req.body;

    const [result] = await pool.query(
      "INSERT INTO tareas (texto) VALUES (?)",
      [texto]
    );

    res.json({
      id: result.insertId,
      texto,
      completada: 0
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// PUT ─ Actualizar tarea
export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, completada } = req.body;

    await pool.query(
      "UPDATE tareas SET texto = ?, completada = ? WHERE id = ?",
      [texto, completada ? 1 : 0, id]
    );

    res.json({ message: "Tarea actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

// DELETE ─ Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tareas WHERE id = ?", [id]);

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};

import { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./todoitem.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);

  // 📥 Cargar tareas
  const cargarTareas = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${BASE_URL}/tasks`);
      setTareas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error cargando tareas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // ➕ Agregar tarea
  const agregarTareas = async () => {
    if (!input.trim()) return;

    try {
      await axios.post(`${BASE_URL}/tasks`, {
        title: input.trim(),
      });
      setInput("");
      cargarTareas();
    } catch (error) {
      console.error("Error agregando tarea:", error);
    }
  };

  // ✅ Completar tarea
  const toggleComplete = async (tarea) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${tarea.id}`, {
        title: tarea.title,
        done: tarea.done ? 0 : 1,
      });
      cargarTareas();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  // ❌ Eliminar tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      cargarTareas();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  // ✏️ Editar tarea
  const editarTarea = async (id, nuevoTexto, done) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${id}`, {
        title: nuevoTexto,
        done,
      });
      cargarTareas();
    } catch (error) {
      console.error("Error editando tarea:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        MI LISTA DE TAREAS REACT
      </h1>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Nueva tarea"
          className="flex-1 p-3 shadow-md rounded border"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTareas()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={agregarTareas}
        >
          Agregar
        </button>
      </div>

      {cargando && (
        <p className="text-center text-gray-500">Cargando tareas...</p>
      )}

      {tareas.map((tarea) => (
        <TodoItem
          key={tarea.id}
          tarea={{
            id: tarea.id,
            texto: tarea.title,
            completada: !!tarea.done,
          }}
          toggleComplete={() => toggleComplete(tarea)}
          eliminarTarea={() => eliminarTarea(tarea.id)}
          editarTarea={(nuevoTexto) =>
            editarTarea(tarea.id, nuevoTexto, tarea.done)
          }
        />
      ))}
    </div>
  );
}

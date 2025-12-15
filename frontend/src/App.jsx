import { useState, useEffect } from "react";
import axios from "axios";

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

  // ❌ Eliminar tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
      cargarTareas();
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        MI LISTA DE TAREAS REACT
      </h1>

      {/* Input */}
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

      {/* Lista */}
      <ul className="space-y-3">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="flex justify-between items-center p-3 bg-white shadow rounded"
          >
            <span className="text-gray-800">{tarea.title}</span>
            <button
              onClick={() => eliminarTarea(tarea.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {tareas.length === 0 && !cargando && (
        <p className="text-center text-gray-400 mt-6">
          No hay tareas todavía
        </p>
      )}
    </div>
  );
}

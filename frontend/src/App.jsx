import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './todoitem.jsx';

const BASE_URL =  import.meta.env.VITE_API_URL

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);

  // ❌ Quitamos carga inicial porque no existe GET aún
  // useEffect(() => {
  //   cargarTareas();
  // }, []);

  // ➕ Agregar tarea
  const agregarTareas = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post(BASE_URL, {
        title: input.trim()
      });

      const nuevaTarea = {
        id: response.data.task?.id || Date.now(),
        texto: input.trim(),
        completada: false
      };

      setTareas([...tareas, nuevaTarea]);
      setInput('');
    } catch (error) {
      console.error('Error agregando tarea:', error);
    }
  };

  // 🔄 Completar tarea (solo local por ahora)
  const toggleComplete = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  // ❌ Eliminar tarea (solo local)
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // ✏️ Editar tarea (solo local)
  const editarTarea = (id, nuevoTexto) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, texto: nuevoTexto } : t
      )
    );
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
          onKeyDown={(e) => e.key === 'Enter' && agregarTareas()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={agregarTareas}
        >
          Agregar
        </button>
      </div>

      {tareas.map((tarea) => (
        <TodoItem
          key={tarea.id}
          tarea={tarea}
          toggleComplete={() => toggleComplete(tarea.id)}
          eliminarTarea={() => eliminarTarea(tarea.id)}
          editarTarea={(nuevoTexto) => editarTarea(tarea.id, nuevoTexto)}
        />
      ))}
    </div>
  );
}

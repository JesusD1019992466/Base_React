import { useState, useEffect } from 'react';
import TodoItem from './todoitem.jsx';
import { taskService } from './services/api';

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(true);

  // 👉 Cargar tareas desde la API al iniciar
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    setCargando(true);
    try {
      const datos = await taskService.getAll();
      // Adaptar datos de la API a tu estructura
      const tareasAdaptadas = datos.map(tarea => ({
        id: tarea.id,
        texto: tarea.title,
        completada: tarea.completed
      }));
      setTareas(tareasAdaptadas);
    } catch (error) {
      console.error('Error cargando tareas:', error);
    } finally {
      setCargando(false);
    }
  };

  // 👉 Agregar tarea a la API
  const agregarTareas = async () => {
    if (input.trim()) {
      try {
        const nuevaTareaAPI = await taskService.create({
          title: input.trim(),
          description: '',
          completed: false
        });
        
        // Actualizar estado local con la tarea de la API
        const nuevaTarea = {
          id: nuevaTareaAPI.id,
          texto: nuevaTareaAPI.title,
          completada: nuevaTareaAPI.completed
        };
        
        setTareas([...tareas, nuevaTarea]);
        setInput('');
      } catch (error) {
        console.error('Error agregando tarea:', error);
      }
    }
  };

  // 👉 Marcar tarea como completada en la API
  const toggleComplete = async (id) => {
    try {
      const tarea = tareas.find(t => t.id === id);
      if (!tarea) return;
      
      await taskService.update(id, {
        title: tarea.texto,
        description: '',
        completed: !tarea.completada
      });
      
      // Actualizar estado local
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        )
      );
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  // 👉 Eliminar tarea de la API
  const eliminarTarea = async (id) => {
    try {
      await taskService.delete(id);
      // Actualizar estado local
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  // 👉 Editar tarea en la API
  const editarTarea = async (id, nuevoTexto) => {
    try {
      const tarea = tareas.find(t => t.id === id);
      if (!tarea) return;
      
      await taskService.update(id, {
        title: nuevoTexto,
        description: '',
        completed: tarea.completada
      });
      
      // Actualizar estado local
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
        )
      );
    } catch (error) {
      console.error('Error editando tarea:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        MI LISTA DE TAREAS REACT
      </h1>

      {/* Input + botón para agregar */}
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Nueva tarea"
          className="flex-1 p-3 shadow-md rounded border"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && agregarTareas()} // Enter agrega tarea
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={agregarTareas}
        >
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <div>
        {cargando ? (
          <p className="text-center text-gray-500">Cargando tareas...</p>
        ) : tareas.length === 0 ? (
          <p className="text-center text-gray-500">No hay tareas aún 🚀</p>
        ) : (
          tareas.map((tarea) => (
            <TodoItem
              key={tarea.id}
              tarea={tarea}
              toggleComplete={() => toggleComplete(tarea.id)}
              eliminarTarea={() => eliminarTarea(tarea.id)}
              editarTarea={(nuevoTexto) => editarTarea(tarea.id, nuevoTexto)}
            />
          ))
        )}
      </div>
    </div>
  );
}
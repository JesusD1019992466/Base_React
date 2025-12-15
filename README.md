Lista de Tareas - 

Aplicación web de lista de tareas (To-Do List) construida con React+Vite en el frontend y Node.js + Express + MySQL en el backend.

Características

-Crear, editar y eliminar tareas
-Marcar tareas como completadas
-Base de datos MySQL
-Configuración lista para Railway

Estructura del Proyecto

```
Base_React/
├── backend/           # Servidor Express + MySQL
│   ├── src/
│   │   ├── app.js    # Configuración del servidor y rutas
│   │   └── db.js     # Conexión a MySQL
│   ├── .env          # Variables de entorno
│   ├── package.json
│   └── railway.json  # Configuración para Railway
│
└── frontend/          # Aplicación React
    ├── src/
    │   ├── App.jsx           # Componente principal
    │   ├── todoitem.jsx      # Componente de tarea individual
    │   ├── main.jsx          # Punto de entrada
    │   └── assets/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

Tecnologías

Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MySQL2** - Cliente de base de datos
- **CORS** - Manejo de peticiones cruzadas
- **dotenv** - Variables de entorno

Frontend
- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos
- **Heroicons** - Iconos

Requisitos Previos

- Node.js (v16 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

Instalación

1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Base_React
```

2. Configurar el Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tododb
DB_PORT=3306
PORT=5000
```

3. Configurar la Base de Datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE tododb;
```

La tabla `tasks` se creará automáticamente al iniciar el servidor.

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install
```

Ejecución en Desarrollo

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
El servidor estará en `http://localhost:5000`

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Obtiene todas las tareas |
| `GET` | `/tasks` | Obtiene todas las tareas |
| `POST` | `/tasks` | Crea una nueva tarea |
| `PATCH` | `/tasks/:id` | Marca tarea como completada/pendiente |
| `PUT` | `/tasks/:id` | Actualiza el título de una tarea |
| `DELETE` | `/tasks/:id` | Elimina una tarea |


Base de Datos

Tabla `tasks`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT | ID autoincremental (PRIMARY KEY) |
| `title` | VARCHAR(255) | Título de la tarea |
| `done` | TINYINT(1) | Estado: 0 = pendiente, 1 = completada |
| `created_at` | DATETIME | Fecha de creación |

Build para Producción

Backend
```bash
cd backend
npm start
```

Frontend
```bash
cd frontend
npm run build
npm run preview
```

Deploy en Railway

El proyecto incluye configuración para Railway (`railway.json`):

1. Conecta tu repositorio a Railway
2. Configura las variables de entorno en Railway
3. Railway detectará automáticamente la configuración

Scripts Disponibles

Backend
- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor con nodemon

Frontend
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint


Licencia

ISC

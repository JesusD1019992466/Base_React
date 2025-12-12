import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Configuración de DB cargada:');
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Base de datos:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  // Opciones adicionales para debug
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error.message);
    console.error('🔍 Detalles:', error);
    return false;
  }
};

export default pool;
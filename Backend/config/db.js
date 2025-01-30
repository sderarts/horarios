// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Crear la conexión con la base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0, // Límite de solicitudes en cola (0 significa sin límite)
});




// Exportar la conexión para usarla en otros archivos
export default db;
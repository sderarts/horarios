// db.js
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// Crear la conexión con la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error de conexión a la base de datos: ", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos!");
});

// Exportar la conexión para usarla en otros archivos
export default db;
// db.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Crear la conexión con la base de datos
const Client = pg.Client;
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
	options: '-c search_path=horarios'
});

db
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});


// Exportar la conexión para usarla en otros archivos
export default db;
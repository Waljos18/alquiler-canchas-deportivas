const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'canchas_piura'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err.message);
        return;
    }
    console.log('Conectado a MySQL');
});

module.exports = connection;
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'recept-pwa',
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
});

module.exports = pool;

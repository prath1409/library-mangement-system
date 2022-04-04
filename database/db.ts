const Pool = require('pg').Pool;
const Client = require('pg')

export const pool: typeof Client = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    port: 5432
});

const { Pool } = require("pg")
const dotenv = require("dotenv");
const { query } = require("express");
dotenv.config();


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

const db = async (query, values) => {
    try {
        const result = await pool.query(query, values)
        return result.rows
    } catch (error) {
        console.error('[db_conect.js]=> db', error)
        const newError = { status: false, message: error }
        throw newError
    }
}

module.exports = { pool, db }
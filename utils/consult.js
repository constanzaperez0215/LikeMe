const { pool } = require('../db/configDB')

// const dotenv = require("dotenv/config")
// dotenv.config();

const getPost = async () => {
    try {
        const query = 'SELECT * FROM posts;'
        const { rows } = await pool.query(query)
        return rows
    } catch (error) {
        throw new Error('Error al obtener los post')
    }
}

const createPost = async ({ titulo, url, descripcion, likes = 0 }) => {
    try {
        const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *;'
        const values = [titulo, url, descripcion, likes]
        const { rows } = await pool.query(query, values)
        return rows
    } catch (error) {
        throw new Error('Error al crear un post')
    }
}

module.exports = { getPost, createPost }
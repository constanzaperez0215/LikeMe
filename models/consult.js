const { pool } = require('../db/configDB')


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

const getPostId = async (id) => {
    try {
        const query = 'SELECT * FROM posts WHERE id = $1;'
        const values = [id]
        const { rows } = await pool.query(query, values)
    } catch (error) {
        throw new Error('No se encontró el post')
    }
}

const updateLikeById = async (id) => await pool('UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;', [id])

const deleteById = async (id) => await pool('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])





module.exports = { getPost, createPost, getPostId, updateLikeById, deleteById }
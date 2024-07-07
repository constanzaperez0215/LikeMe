const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { getPost, createPost, getPostId, updateLikeById, deleteById } = require('./models/consult')


const app = express()

app.use(express.json())
app.use(cors())

// Informa el estado de la api --- la ruta también puede llamarse /health
app.get('/', (_, res) => res.status(200).send('Conectados a la api Likeme'))

app.get('/posts', async (_, res) => {
    try {
        const posts = await getPost()
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ status: false, message: 'No se ha podido realizar la consulta', error})
    }
})

app.get('/posts', async (_, res) => {
    try {
        const posts = await getPostId(req.params.id)
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).send(error)
    }
})

app.post('/posts', async (req, res) => {
    try {
        await createPost(req.body)
        res.status(201).send('post creado con exito')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params
        await updateLikeById(id)
        res.status(200).send('Actualización exitosa!')
    } catch (error) {
        res.status(500).send('Post no se puso modificar')
    }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params
        await deleteById(id)
        res.status(200).send('Post eliminado')
    } catch (error) {
        res.status(500).send('No se encontró el post')
    }
})

app.all('*', (_, res) => {
    res.status(404).send('No existe esta ruta!')
})

app.listen(process.env.PORT, () => console.log('Puerto conectado!'))

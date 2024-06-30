const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { getPost, createPost } = require('./utils/consult')


const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).send('Conectados a la api Likeme')
})

app.get('/posts', async (req, res) => {
    try {
        const posts = await getPost()
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send(error)
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

app.listen(process.env.PORT, () => console.log('Puerto conectado!'))

import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send({ info: 'Journal API 2023' }))

app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.get('/categories/:id', async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id)
        if (category) {
            res.send(category)
        } else {
            res.status(404).send({ error: 'Category not found' })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.post('/categories', async (req, res) => {
    try {
        const { name } = req.body
        const newCategory = { name }
        const insertedCategory = await CategoryModel.create(newCategory)
        res.status(201).send(insertedCategory)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

app.use('/entries', entryRoutes)

export default app
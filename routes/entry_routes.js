import express from 'express'
import { EntryModel } from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(await EntryModel.find())
    res.send(await EntryModel.find().populate({ path: 'category', select: ['_id', 'name'] }))
})

router.get('/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findById(req.params.id).populate({ path: 'category', select: ['_id', 'name'] })
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const { category, content } = req.body
        const newEntry = { category, content }
        const insertedEntry = await EntryModel.create(newEntry)
        res.status(201).send(await insertedEntry.populate({ path: 'category', select: ['name'] }))
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.put('/:id', async (req, res) => {
    const { category, content } = req.body
    const newEntry = { category, content }

    try {
        const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, { returnDocument: 'after' })
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findByIdAndDelete(req.params.id)
        if (entry) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

export default router
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
}

try {
    const m = await mongoose.connect(process.env.ATLAS_DB_URL)
    console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Mongoose failed to connect')
}
catch (err) {
    console.log(err)
}

const entrySchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)
const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }
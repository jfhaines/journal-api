import { EntryModel, CategoryModel, dbClose } from './db.js'

await EntryModel.deleteMany({})
await CategoryModel.deleteMany({})

const categories = [
    { name: 'Food' },
    { name: 'Coding' },
    { name: 'Work' },
    { name: 'Other' },
]

let categoryArray = await CategoryModel.insertMany(categories)
console.log('Inserted categories')

const entries = [
    { category: categoryArray[0], content: 'Hello!' },
    { category: categoryArray[1], content: 'Express is cool!' },
    { category: categoryArray[2], content: 'Another day at the office!' },
]

await EntryModel.insertMany(entries)
console.log('Inserted entries')

dbClose()
import app from './app.js'

const port = process.env.PORT || 4001

// starting server
app.listen(port, console.log(`App running at http://localhost:${port}/`))
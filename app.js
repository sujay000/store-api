require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')

// middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send(
        '<h1>heloo heehe</h1><a href="/api/v1/products" >click me to go to products page</a> '
    )
})

// products route
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

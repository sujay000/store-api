require('dotenv').config()
// async errors

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send(
        '<h1>heloo heehe</h1><a href="/api/v1/products" >click me to go to products page</a> '
    )
})

// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = () => {
    try {
        //connectDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

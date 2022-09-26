const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const mainRouter = require('./router/mainRouter')

require('dotenv').config()

mongoose.connect(process.env.MONGO_KEY).then(res => {
    console.log('CONNECTED')
}).catch(e => {
    console.log('ERROR')
})

app.listen(4000)
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET, POST'
}))

app.use('/', mainRouter)
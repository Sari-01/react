const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const routes = require('./routes/routes')

app.use(express.json())
app.use(cors())
app.use('/api', routes)

const port = process.env.PORT || 8080;


mongoose.connect(process.env.uri, {  })
    .then(() => {
        console.log("MongoDb connected")
    })
    .catch((err) => {
        console.log("error in connecting ", err)
    })

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
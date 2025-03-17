const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./routes/routes')
const fetching_details = require('./routes/fetching_details')
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/routes', route)
app.use('/fetching_details', fetching_details)
mongoose.Promise = global.Promise

const uri = "mongodb+srv://Sariha:Sabarish15*@cluster0.rdbdb.mongodb.net/react_signin&login?retryWrites=true&w=majority"; //mongo db connection

mongoose.connect(uri, {})
    .then((data) => {
        console.log("Connected to DB successfully")
    })
    .catch((err) => {
        console.log("Error while connecting", err)
    })

app.listen(8080, () => {
    console.log("Listening to port 8080")
})
const express = require('express')
const mongoose = require('./config/mongoose')


const app = express()


app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

app.listen(5000, () => {
    console.log('Server started at port 5000')
})
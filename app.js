const express = require('express')
const mongoose = require('./config/mongoose')

const path = require('path');

const app = express()
app.use(express.static('public'));

app.use(express.json())
app.get('/', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)


app.listen(9000, () => {
    console.log('Server started at port 5000')
})
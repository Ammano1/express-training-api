const express = require('express')
const app = express()
const trainsController = require('./controllers/trains')

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello from Nerdbord!')
})

app.use('/trains', trainsController.getTrains)

app.listen(PORT, () => {
    console.log('Server listening on port 4000')
})

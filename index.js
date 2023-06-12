const express = require('express')
const app = express()
const trainsRoutes = require('./routes/trains')

const PORT = process.env.PORT || 4000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Nerdbord!')
})

app.use(trainsRoutes)


app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

app.listen(PORT, () => {
    console.log('Server listening on port 4000')
})

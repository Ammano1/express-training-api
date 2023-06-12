const Train = require('../models/train');
const fs = require('fs');
const path = require('path');
const trainsPath = path.join(__dirname, '../data/trains.json');

function readTrains(callback) {
	fs.readFile(trainsPath, 'utf8', (err, data) => {
		if (err && err.code !== 'ENOENT') {
			callback(err);
			return;
		}
		const trains = data ? JSON.parse(data) : [];
		callback(null, trains);
	});
}

exports.getTrains = (req, res, next) => {
	readTrains((err, trains) => {
		if (err) {
			res.status(500).send('An error occurred while reading the data.');
		} else {
			res.send(trains);
		}
	});
};

exports.createTrain = (req, res, next) => {
	const train = new Train(
		req.body.trainExpressName,
		req.body.countryOfOrigin,
		req.body.yearOfConstruction,
		req.body.maxKilometerPerHour,
		req.body.destinationFrom,
		req.body.destinationTo
	);

	readTrains((err, trains) => {
		if (err) {
			res.status(500).send('An error occurred while reading the data.');
			return;
		}
		trains.push(train);
		fs.writeFile(trainsPath, JSON.stringify(trains), err => {
			if (err) {
				res.status(500).send('An error occurred while saving the data.');
			} else {
				res.send(`Data saved successfully. The train's ID is ${train.id}.`);
			}
		});
	});
};

const Train = require('../models/train');
const fs = require('fs');
const path = require('path');
const trainsPath = path.join(__dirname, '../data/trains.json');
const validateTrainData = require('../utils/validation.js');

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
	if (!validateTrainData(req.body, res)) {
		return;
	}

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

exports.updateTrain = (req, res, next) => {
	if (!validateTrainData(req.body, res)) {
		return;
	}

	const id = req.params.id;
	const train = new Train(
		req.body.trainExpressName,
		req.body.countryOfOrigin,
		req.body.yearOfConstruction,
		req.body.maxKilometerPerHour,
		req.body.destinationFrom,
		req.body.destinationTo
	);

	train.id = id;

	readTrains((err, trains) => {
		if (err) {
			res.status(500).send('An error occurred while reading the data.');
			return;
		}
		const trainIndex = trains.findIndex(train => train.id === id);
		if (trainIndex < 0) {
			res.status(404).send(`Train with ID ${trainId} not found.`);
		} else {
			trains[trainIndex] = train;
			fs.writeFile(trainsPath, JSON.stringify(trains), err => {
				if (err) {
					res.status(500).send('An error occurred while saving the data.');
				} else {
					res.send(`Data updated successfully.`);
				}
			});
		}
	});
};

exports.deleteTrain = (req, res, next) => {
	const id = req.params.id;
	readTrains((err, trains) => {
		if (err) {
			res.status(500).send('An error occurred while reading the data.');
		}

		const trainIndex = trains.findIndex(train => train.id === id);
		if (trainIndex < 0) {
			res.status(404).send(`Train with ID ${id} not found.`);
			return;
		}

		trains.splice(trainIndex, 1);

		fs.writeFile(trainsPath, JSON.stringify(trains), err => {
			if (err) {
				res.status(500).send('An error occurred while saving the data.');
			} else {
				res.send(`Data deleted successfully.`);
			}
		});
	});
};

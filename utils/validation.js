function validateTrainData(data, res) {
	const trainExpressName = data.trainExpressName;
	const countryOfOrigin = data.countryOfOrigin;
	const yearOfConstruction = data.yearOfConstruction;
	const maxKilometerPerHour = data.maxKilometerPerHour;
	const destinationFrom = data.destinationFrom;
	const destinationTo = data.destinationTo;
	if (
		!trainExpressName ||
		!countryOfOrigin ||
		!yearOfConstruction ||
		!maxKilometerPerHour ||
		!destinationFrom ||
		!destinationTo
	) {
		res.status(400).send('All fields are required: trainExpressName, countryOfOrigin, yearOfConstruction, maxKilometerPerHour, destinationFrom, destinationTo.');
		return false;
	}
	return true;
}

module.exports = validateTrainData;

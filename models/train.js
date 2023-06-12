module.exports = class Train {
	constructor(
		trainExpressName,
		countryOfOrigin,
		yearOfConstruction,
		maxKilometerPerHour,
		destinationFrom,
		destinationTo
	) {
		this.id = Math.floor(Math.random() * 1000000) + 1;
		this.trainExpressName = trainExpressName;
		this.countryOfOrigin = countryOfOrigin;
		this.yearOfConstruction = yearOfConstruction;
		this.maxKilometerPerHour = maxKilometerPerHour;
		this.destinationFrom = destinationFrom;
		this.destinationTo = destinationTo;
	}
};

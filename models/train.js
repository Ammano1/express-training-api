const fs = require('fs');
const path = require('path');
const trainsPath = path.join(__dirname, '../data/trains.json');

const getTrainsFromFile = cb => {
    fs.readFile(trainsPath, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Train {
    static fetchAll(cb) {
        getTrainsFromFile(cb);
    }
}
const express = require('express');
const router = express.Router();
const trainsController = require('../controllers/trains');

router.get('/trains', trainsController.getTrains);
router.post('/trains', trainsController.createTrain);

module.exports = router;
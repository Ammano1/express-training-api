const express = require('express');
const router = express.Router();
const trainsController = require('../controllers/trains');

router.get('/trains', trainsController.getTrains);
router.post('/trains', trainsController.createTrain);
router.put('/trains/:id', trainsController.updateTrain);
router.delete('/trains/:id', trainsController.deleteTrain);

module.exports = router;
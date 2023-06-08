const express = require('express');

const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/tire', projectController.getTireRotations, (req, res) => {
  res.status(200).json(res.locals.tireRotations); // send back data
});

router.post('/tire', projectController.addTireRotations, (req, res) => {
  res.status(200).json(res.locals.tireRotation); // send back data
});

// router.post('/lock', projectController.lockCar, (req, res) => {
//   res.status(200); // send message
// });

// router.post('/unlock', projectController.unlock, (req, res) => {
//   res.status(200); // send message
// });

module.exports = router;

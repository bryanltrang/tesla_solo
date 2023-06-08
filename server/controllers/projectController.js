const models = require('../models/models');
const moment = require('moment');

const projectController = {};

// project controller to post tire rotations to db
projectController.addTireRotations = async (req, res, next) => {
  const { id, odometer } = req.body.car;
  const currentDate = moment().format();
  const rotations = models.Rotations;

  const newRotation = await rotations.create({
    miles: odometer,
    vehicle_id: id,
    created_at: currentDate,
  });

  res.locals.tireRotation = newRotation;

  return next();
};

// project controller to fetch tire rotations from db
projectController.getTireRotations = (req, res, next) => {
  const { id } = req.query;
  return next();
};

// extra credit:

// project controller to post lock
projectController.lockCar = (req, res, next) => {};

// project controller to post unlock
projectController.unlockCar = (req, res, next) => {};

module.exports = projectController;

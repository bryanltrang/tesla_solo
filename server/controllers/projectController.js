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
projectController.getTireRotations = async (req, res, next) => {
  const rotations = models.Rotations;
  const { id } = req.query;
  const foundRotations = await rotations.find({ vehicle_id: id });
  if (!foundRotations[0]) {
    return next({
      log: 'error in GET request for getTireRotations controller',
      message: { err: 'error in GET request for getTireRotations controller' },
    });
  }
  res.locals.tireRotations = foundRotations;
  return next();
};

// extra credit:

// project controller to post lock
projectController.lockCar = (req, res, next) => {};

// project controller to post unlock
projectController.unlockCar = (req, res, next) => {};

module.exports = projectController;

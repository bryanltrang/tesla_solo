const db = require('../models/models');

const projectController = {};

// project controller to post tire rotations to db
projectController.addTireRotations = (req, res, next) => {
  const { vin, odometer } = req.body.car;
  const currentDate = Date.now();

  const addTireQuery =
    'INSERT INTO tire_rotations (miles, vehicle_id, created_at) VALUES ($1, $2, $3);';
  db.query(addTireQuery, [odometer, vin, currentDate])
    .then((data) => {
      console.log('added tire rotation', data.rows);
      res.locals.tireRotation = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Issue found in projectController.addTireRotations',
        message: { err: 'error in projectController.addTireRotations' },
      });
    });
};

// project controller to fetch tire rotations from db
projectController.getTireRotations = (req, res, next) => {
  const { id } = req.query;
  const getTireQuery =
    'SELECT * FROM tire_rotations t WHERE t.vehicle_id = $1;';
  db.query(getTireQuery, [id])
    .then((data) => {
      console.log('all tire rotations', data.rows);
      res.locals.tireRotations = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Issue found in projectController.getTireRotations',
        message: { err: 'error in projectController.getTireRotations' },
      });
    });
};

// extra credit:

// project controller to post lock
projectController.lockCar = (req, res, next) => {};

// project controller to post unlock
projectController.unlockCar = (req, res, next) => {};

module.exports = projectController;

// app.post('/lock', async (req, res) => {
//     try {
//       const { action } = req.body;
//       console.log(req.body);
//       if (!action) res.sendStatus(400);
//       const { accessToken } = req.cookies.accessCode;
//       const { vehicles } = await smartcar.getVehicles(accessToken);
//       const vehicle = new smartcar.Vehicle(vehicles[0], accessToken);

//       if (action === 'LOCK') vehicle.lock();
//       if (action === 'UNLOCK') vehicle.unlock();
//       res.sendStatus(200);
//     } catch (err) {
//       res.sendStatus(400);
//       // return next({
//       //   log: 'Issue found in POST /lock endpoint',
//       //   message: { err: 'error in POST /lock endpoint' },
//       // });
//     }
//   });

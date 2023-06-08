const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const smartcar = require('smartcar');
const apiRouter = require('./routes/api.js');

// set the server port
const PORT = 3000;

// parse request data coming into server
app.use(express.json());
// use cookie parser
app.use(cookieParser());

// server static file from client
app.use(express.static(path.join(__dirname, '../build')));

// app.use('/build', express.static(path.join(__dirname, '../build'))); <- does not work to set static files

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// DO NOT REMOVE OR ELSE IT WILL BREAK - how can I avoid having to duplicate this in server to make call to
const client = new smartcar.AuthClient({
  mode: 'test',
  clientId: 'ffcdfc20-0a5f-47a4-b051-7c52543cc333',
  clientSecret: 'e1dbe7c4-8345-4006-ad46-34595869f5a2',
  scope: ['read_vehicle_info', 'read_odometer', 'read_battery'],
  redirectUri:
    'https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:8080',
});

// used to store the code
let access;

// user is redirect to here after auth
app.get('/exchange', async (req, res) => {
  try {
    if (!req.cookies.accessCode) {
      // get code and access code
      const { code } = req.query;
      access = await client.exchangeCode(code);
      console.log('access', access);
      // set cookie here
      res.cookie('accessCode', access);
    }
    return res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});

// GET ACCESS TOKEN

app.get('/vehicle', async (req, res) => {
  try {
    console.log('cookie', req.cookies);
    const { accessToken } = req.cookies.accessCode;
    const { vehicles } = await smartcar.getVehicles(accessToken);

    // instantiate first vehicle in vehicle list
    const vehicle = new smartcar.Vehicle(vehicles[0], accessToken);

    // get identifying information about a vehicle
    const attributes = await vehicle.attributes();
    const odometer = await vehicle.odometer();
    const battery = await vehicle.battery();
    const vehicleData = { ...odometer, ...attributes, ...battery };
    return res.status(200).json(vehicleData);
  } catch (err) {
    res.sendStatus(400);
  }
});

//API ROUTER

app.use('/api', apiRouter);

// need 404 reroute page here!!

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global error handler
// app.use((error, req, res, next) => {
//   const defaultError = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errObj = Object.assign({}, defaultError, error);
//   return res.status(errObj.status).json(errObj.message);
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;

import React from 'react';
import LogoImage from './assets/logo.svg';
import YourWheels from './assets/your-WHEELS.svg';
import CarImage from './assets/model-3.svg';

const Dashboard = ({ info }) => {
  const { distance, make, model, range, year, percentRemaining } = info;
  const { requestId } = info.meta;
  const factor = 0.621371;
  const miles = distance * factor;
  const rangeMiles = range * factor;
  return (
    <div className="wrapper-div">
      <div className="left-div">
        <div className="logo-wrapper">
          <img src={LogoImage} className="logo-img" />
          <img src={YourWheels} className="logo your-wheels" />
        </div>
        <img src={CarImage} className="car-img" />
      </div>
      <div className="center-div left">
        <h1>
          {make} {model} ({year})
        </h1>
        <div className="charge-level">
          Charge Level {Math.floor(percentRemaining * 100)}% /
          {Math.floor(rangeMiles)}
          miles
        </div>
        <div className="odometer-level">
          Odometer: {Math.floor(miles)} miles
        </div>
        <form>
          <input
            className="field"
            type="text"
            placeholder="Last tire change?"></input>
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

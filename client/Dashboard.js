import React from 'react';
import LogoImage from './assets/logo.svg';
import YourWheels from './assets/your-WHEELS.svg';
import CarImage from './assets/model-3.svg';

const Dashboard = ({ info }) => {
  const { distance, make, model, range, year, percentRemaining } = info;
  const { requestId } = info.meta;
  return (
    <div className="wrapper-div">
      <div className="left-div">
        <img src={LogoImage} className="logo-img" />
        <img src={YourWheels} className="logo" />
        <img src={CarImage} className="car-img" />
      </div>
      <div className="center-div">
        <h1>
          {make} {model} ({year})
        </h1>
        <div className="charge-level">
          Charge Level {Math.floor(percentRemaining)}% / {range}
          miles
        </div>
        <div className="odometer-level">
          Odometer: {Math.floor(distance)} miles
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

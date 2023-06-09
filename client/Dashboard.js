import React, { useState, useEffect } from 'react';
import LogoImage from './assets/logo.svg';
import YourWheels from './assets/your-WHEELS.svg';
import CarImage from './assets/model-3.svg';
import moment from 'moment';

const Dashboard = ({ info }) => {
  const [lockMessage, setLockMessage] = useState('');
  const [tireMessage, setTireMessage] = useState(
    'Your last 5 tire rotations...'
  );
  const [tireRecords, setTireRecords] = useState([]);
  const { distance, make, model, range, year, percentRemaining, id } = info;
  const { requestId } = info.meta;
  const factor = 0.621371;
  const miles = distance * factor;
  const rangeMiles = range * factor;

  useEffect(() => {
    fetch(`/api/tire/?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('fetch rotation data', data);
        setTireRecords(data);
      })
      .catch((err) => console.log(err));
  }, [tireMessage]);

  const tireElements = [];

  tireRecords.forEach((record) => {
    const { miles, created_at } = record;
    tireElements.push(
      <div className="tire-record">
        <p>{Math.floor(miles)} miles</p>
        <p>{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
    );
  });

  const fiveTireElements = [];
  for (let i = tireElements.length - 1; i > tireElements.length - 6; i--) {
    fiveTireElements.push(tireElements[i]);
  }

  // const handleLock = () => {
  //   fetch('/lock', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ action: 'LOCK' }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setLockMessage('Your car is locked');
  //     });
  // };

  // const handleUnlock = () => {
  //   fetch('/lock', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ action: 'UNLOCK' }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setLockMessage('Your car is unlocked');
  //     });
  // };

  // handle on click
  // post to db passing in vin into body
  // console log response
  const handleAddRotation = () => {
    console.log('Added tire rotation');
    fetch('/api/tire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ car: { id: id, odometer: miles } }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setTireMessage('You added a new record');
      })
      .catch((err) => {
        console.log('Add Tire Rotatioon fetch /api/tire error: ', err);
      });
  };

  return (
    <div className="wrapper-div">
      <div className="left-div">
        <div className="logo-wrapper">
          <img src={LogoImage} className="logo-img" />
          <img src={YourWheels} className="logo your-wheels" />
        </div>
        <img src={CarImage} className="car-img" />
      </div>
      {/* Make this into a component */}
      <div className="center-div left">
        <h1>
          {make} {model} ({year})
        </h1>
        <div className="charge-level">
          Charge Level {Math.floor(percentRemaining * 100)}% /
          {Math.floor(rangeMiles)} miles
        </div>
        <div className="odometer-level">
          Odometer: {Math.floor(miles)} miles
        </div>
        {/* LOCK / UNLOCK */}
        {/* <div>
          <button onClick={handleLock}>Lock</button>
          <button onClick={handleUnlock}>Unlock</button>
          {lockMessage}
        </div> */}
        <button className="btn" onClick={handleAddRotation}>
          I rotated my tires
        </button>
        <p className="sub-title">{tireMessage}</p>
        {fiveTireElements}
      </div>
      {/* Make this into a component */}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Smartcar from '@smartcar/auth';
import styles from './styles.scss';

const App = () => {
  const [vehicle, setVehicle] = useState({});

  // on mount will check local storage for data and fetch latest data from server
  useEffect(() => {
    const persistedVehicle = window.localStorage.getItem('Vehicle');
    console.log('persistedState', persistedVehicle);
    if (persistedVehicle) {
      // fetch latest data
      fetch('/vehicle')
        .then((res) => res.json())
        .then((data) => {
          setVehicle(data);
          window.localStorage.setItem('Vehicle', JSON.stringify(data));
        })
        .catch((err) => {
          console.log('/fetch refresh error:', err);
        });
    }
  }, []);

  // on complete will get access token and then get vehicle data
  const onComplete = (err, code) => {
    fetch(`/exchange?code=${code}`)
      .then(() => {
        return fetch(`/vehicle`)
          .then((res) => res.json())
          .then((data) => {
            setVehicle(data);
            window.localStorage.setItem('Vehicle', JSON.stringify(data));
          });
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log('/exchange fetch error:', err));
  };

  // authorize when user clicks login
  const authorize = () => {
    const smartcar = new Smartcar({
      clientId: 'ffcdfc20-0a5f-47a4-b051-7c52543cc333',
      clientSecret: 'e1dbe7c4-8345-4006-ad46-34595869f5a2',
      redirectUri:
        'https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:8080',
      scope: ['read_vehicle_info', 'read_odometer', 'read_battery'],
      mode: 'test',
      onComplete: onComplete,
    });

    smartcar.openDialog({ forcePrompt: true });
  };

  return Object.keys(vehicle).length !== 0 ? (
    <Dashboard info={vehicle} />
  ) : (
    <Login onClick={authorize} />
  );
};

export default App;

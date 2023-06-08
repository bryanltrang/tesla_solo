import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Smartcar from '@smartcar/auth';
import styles from './styles.scss';

const App = () => {
  const [vehicle, setVehicle] = useState({});

  // on complete
  const onComplete = (err, code) => {
    fetch(`/exchange?code=${code}`)
      .then(() => {
        return fetch(`/vehicle`)
          .then((res) => res.json())
          .then((data) => {
            setVehicle(data);
          });
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log('/exchange fetch error:', err));
  };

  // authorize
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

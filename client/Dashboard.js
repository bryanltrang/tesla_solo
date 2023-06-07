import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [requestId, setRequestId] = useState('');
  const [carMake, setCarMake] = useState('loading...');
  const [model, setModel] = useState('loading...');
  const [carYear, setCarYear] = useState('loading...');

  useEffect(() => {
    fetch('/dashboard')
      .then((data) => data.json())
      .then((vehicle) => {
        // set request id
        const { requestId } = vehicle.meta;
        setRequestId = requestId;

        // set carMake
        const { carMake, model, year } = vehicle;
        setCarMake(carMake);
        setModel(model);
        setCarYear(year);
      });
  }, [carMake, model, carYear, requestId]);

  // fetch vehicle data

  return (
    <div>
      <h1> Dashboard</h1>
      <div>
        <h2>
          Your {carYear} {carMake} {model}
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;

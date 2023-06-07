import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Exchange from './Exchange';
import Login from './Login';
import styles from './styles.scss';

const App = () => {
  return (
    <>
      <div className="bg">
        <div className="center-div">
          <h1>TireTrackr for Tesla</h1>
          <Link className="login-btn" to="/login">
            Login
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

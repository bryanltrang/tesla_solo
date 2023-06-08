import React from 'react';
import LogoImage from './assets/logo.svg';
import Logo from './assets/deez-WHEELS.svg';
import CarOne from './assets/car-1.svg';
import CarTwo from './assets/car-2.svg';

const Login = ({ onClick }) => {
  return (
    <div className="bg">
      <img className="car-one" src={CarOne}></img>
      <img className="car-two" src={CarTwo}></img>
      <div className="center-div">
        <img className="logo-img" src={LogoImage}></img>
        <img className="logo" src={Logo}></img>

        <p className="sub-title">Start by connecting your Tesla</p>

        <button className="btn" onClick={onClick}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default Login;

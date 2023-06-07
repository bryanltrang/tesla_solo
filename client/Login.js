import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(0);
  }, []);

  return <div></div>;
};

export default Login;

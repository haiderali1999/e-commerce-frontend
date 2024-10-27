/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate, auth]);

  return auth ? children : null;
};

export default Protected;

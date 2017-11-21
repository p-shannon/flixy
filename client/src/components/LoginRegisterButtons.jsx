import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegisterButtons = () => {
  return (
    <div className="loginregisterbuttons">
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
    </div>
    );
};

export default LoginRegisterButtons;

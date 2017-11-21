import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
    <h1>This is the landing page</h1>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
    </div>
    );
};

export default Landing;

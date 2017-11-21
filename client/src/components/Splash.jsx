import React from 'react';
import LoginRegisterButtons from './LoginRegisterButtons';
import Login from './Login';
import Register from './Register';


const Splash = (props) => {
  return (
    <div className="splash">
    <h1>FLIXY</h1>
    <LoginRegisterButtons />
    <Login handleLoginSubmit={props.handleLoginSubmit} />
    <Register handleRegisterSubmit={props.handleRegisterSubmit}/>
    </div>
    );
};

export default Splash;

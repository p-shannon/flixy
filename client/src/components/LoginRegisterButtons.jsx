import React from 'react';

const LoginRegisterButtons = (props) => {
  return (
    <div className="loginregisterbuttons">
      <button onClick={props.getLoginForm}>Login</button>
      <button onClick={props.getRegisterForm} >Register</button>
    </div>
    );
};

export default LoginRegisterButtons;

import React, { Component } from 'react';
import LoginRegisterButtons from './LoginRegisterButtons';
import Login from './Login';
import Register from './Register';

import { Redirect } from 'react-router-dom'


class Splash extends Component {
  constructor(props) {
    super(props);
  }

  decideWhichToRender() {
  switch (this.props.currentPage) {
    case 'login':
      return <Login handleLoginSubmit={this.props.handleLoginSubmit}/>;
      break;
    case 'register':
      return <Register handleRegisterSubmit={this.props.handleRegisterSubmit}/>;
      break;
    default:
      return <Redirect push to="/" />;
      break;
    }
  }


render() {
  return (
    <div className="splash">
      <h1>FLIXY</h1>
      <div className="buttons">
      <LoginRegisterButtons getRegisterForm={this.props.getRegisterForm} getLoginForm={this.props.getLoginForm}/>
      {this.decideWhichToRender()}
      </div>
    </div>
    );
  }
};

export default Splash;

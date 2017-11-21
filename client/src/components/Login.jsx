
//LN - importing react and component
import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    //LN-initializing state with values of username and password w empty string
    this.state = {
      username: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

//LN-function handling user submission into login form and has access to the data put in
handleInputChange(e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({
    [name]: value,
  });
}


render() {
  return (
    <div className="loginform">
      <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
        <input type="text" name="username"
        value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
        <input type="password" name="password"
        value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
        <input type="submit" value="Login" />
      </form>
    </div>
  )}
}

export default Login;
//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md

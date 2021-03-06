import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import AddMovie from './components/AddMovie';
import Splash from './components/Splash';
import Main from './components/Main'

class App extends Component {
  constructor() {
  super();
  this.state = {
    auth: false,
    user: null,
  }
  this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  this.logout = this.logout.bind(this);
  this.getRegisterForm = this.getRegisterForm.bind(this)
  this.getLoginForm = this.getLoginForm.bind(this)
  }

//LN-call to the backend to prevent from logging out the user upon refresh
  componentDidMount() {
    fetch('/auth/verify', { credentials: 'include'}).then(res => res.json()).then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err));
  }

//LN-posting user register submit
handleRegisterSubmit(e, data) {
    e.preventDefault();
    console.log(data);
    fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          auth: res.auth,
          user: res.data.user,
        })
      }).catch(err => console.log(err));
    }

  //LN-login submit, posting user login info
handleLoginSubmit(e, data) {
  e.preventDefault();
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  credentials: 'include',
  body: JSON.stringify(data),
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err));
}

//LN- logout function
logout() {
  fetch('/auth/logout', {
    credentials: 'include',
  }).then(res => res.json())
    .then(res => {
      this.setState({
        auth: res.auth,
        user: res.data.user,
      })
    }).catch(err => console.log(err))
}

//LN,SH,AF adding in register and login forms to conditionally render w buttons
  getRegisterForm() {
    console.log('getregisterformworking')
    this.setState ({
      currentPage: 'register',
    })
  }

  getLoginForm() {
    console.log('getloginformworking')
    this.setState ({
      currentPage: 'login',
    })
  }

//AF - currently returning the 'add form', though we should refactor into indiv. component
//LN - adding in route paths to auth components with props
render() {
    return (
      <Router>
      <div className="App">
        <Route exact path='/' render={() => (
        this.state.auth
          ? <Redirect to='/main' />
          : <Splash handleLoginSubmit={this.handleLoginSubmit} 
          handleRegisterSubmit={this.handleRegisterSubmit} getRegisterForm={this.getRegisterForm} getLoginForm={this.getLoginForm}
          currentPage={this.state.currentPage}/>
          ) }/>
        <Route exact path='/login' render={() => (
        this.state.auth
          ? <Redirect to='/movies' />
          : <Login handleLoginSubmit={this.handleLoginSubmit} />
        )} />
        <Route exact path='/register' render={() => (
        this.state.auth
        ? <Redirect to='/movies' />
        : <Register handleRegisterSubmit={this.handleRegisterSubmit} />
        )} />
        <Route exact path='/movies' render={() => (
        !this.state.auth
          ? <Redirect to='/' />
          : <AddMovie logout={this.logout} fetchMovie={this.fetchMovie} postMovie={this.postMovie}/>
        )} />
        <Route exact path='/main' render={() => (
        !this.state.auth
        ? <Redirect to='/' />
        : <Main user={this.state.user} logout={this.logout} />
        )} />
      </div>
     </Router>
      )
  }
}

export default App;


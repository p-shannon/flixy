import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Movie from './components/Movie';
import Splash from './components/Splash';

class App extends Component {
  constructor() {
  super();
  this.state = {
    auth: false,
    user: null,
    dataLoaded: false,
    title: "",
    year: 0,
    poster: "",
    director: "",
    genre: "",
    runtime: "",
    rated: "",
    plot: "",
    ratings: "",
  }
  this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  this.logout = this.logout.bind(this);
  this.fetchMovie = this.fetchMovie.bind(this);
  this.postMovie = this.postMovie.bind(this);
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

//AF - grabbing movie data from external database
  fetchMovie (e) {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=229c8971&t=${e.target.title.value}`, {
      method: 'GET',
      headers: {},
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      console.log(`title: ${res.Title}`)
      this.setState({
        dataLoaded: true,
        title: res.Title,
        year: res.Year,
        poster: res.Poster,
        director: res.Director,
        genre: res.Genre,
        runtime: res.Runtime,
        rated: res.Rated,
        plot: res.Plot,
        ratings: res.Ratings,
      })
    }).then(() => {
    console.log(this.state.title)
    this.postMovie()
    })
  }

  // AF - adding data to local database through POST request
  postMovie() {
    console.log('posted')
    console.log(this.state)
    fetch('/movies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title:    this.state.title,
        year:     this.state.year,
        poster:   this.state.poster,
        director: this.state.director,
        genre:    this.state.genre,
        runtime:  this.state.runtime,
        rated:    this.state.rated,
        plot:     this.state.plot,
        ratings:  this.state.ratings,
      })
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
          ? <Redirect to='/movies' />
          : <Splash handleLoginSubmit={this.handleLoginSubmit}
          handleRegisterSubmit={this.handleRegisterSubmit} />
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
          ? <Redirect to='/login' />
          : <Movie logout={this.logout} fetchMovie={this.fetchMovie} postMovie={this.postMovie}/>
        )} />
      </div>
     </Router>
      )
  }
}

export default App;


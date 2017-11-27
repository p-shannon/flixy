import React, { Component } from 'react';
import UsersList from './UsersList';
import AddMovie from './AddMovie';
import Feed from './Feed';
import Nav from './Nav';
import SingleMovie from './SingleMovie';


class Main extends Component {
  constructor(props) {
  super(props);
  this.state = {
    usersLoaded: false,
    moviesLoaded: false,
    usersList: null,
    selectedUser: null,
    movieFeed: null,
    selectedMovie: {},
    singleLoaded: false,
    dataLoaded: false,
    selectedComments: [],
    selectedRatings: [],
    fetchedMovie: null,
    user: this.props.user,
    userPageLoaded: null,
    title: "",
    year: 0,
    poster: "",
    director: "",
    genre: "",
    runtime: "",
    rated: "",
    plot: "",
    ratings: "",
    currentPage: null,
    }
    this.fetchMovie = this.fetchMovie.bind(this);
    this.postMovie = this.postMovie.bind(this);
    this.getOneUser = this.getOneUser.bind(this);
    this.resetSelectedUser = this.resetSelectedUser.bind(this);
    this.singleMovie = this.singleMovie.bind(this);
    this.resetPreview = this.resetPreview.bind(this);
  }

componentDidMount() {
  this.getUsers()
  this.getMovies()
  }

//AF - grabbing movie data from external database
  fetchMovie (e) {
    e.preventDefault();
    //PS - Note: We'll eventually have to hide this api key somehow...
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
        fetchedMovie: res,
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
    document.querySelector(".input").reset()
    })
  }

  // AF - adding data to local database through POST request
  postMovie() {
    console.log('posted')
    console.log(this.state)
    fetch('/api/movies/', {
      method: 'POST',
      credentials: 'include',
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
    }).then(() => {

      {this.state.userPageLoaded === false
      ? this.getMovies()
      : this.getOneUser(this.props.user.id)}

      this.resetPreview()
    })
  }

getUsers() {
  fetch('/api/users/', {
    method: 'GET',
    headers: {},
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    this.setState({
      usersLoaded: true,
      usersList: res.data.users,
    })
  })
}

//PS - Grab a single user
//LN- set moviesLoaded to true whenever user gets clicked to ensure functionality throughout app
getOneUser(id) {
  console.log('THIS IS WORKING bing!')
  //PS - good ol' string literals
  fetch(`/api/users/${id}/`)
  //PS - make that shit json
  .then(res => res.json())
  //PS - put that shit where it belongs
  .then(res => {
    console.log('Data recieved:',res)
    this.setState({
      userPageLoaded: true,
      selectedUser: res.data,
      moviesLoaded: true,
    })
  })
  .then(() => {
    console.log('Current state:',this.state)
  })
}

//PS - this sets the selected user back to null
resetSelectedUser(){
  this.setState({
    selectedUser: null,
    userPageLoaded: false,
    moviesLoaded: true,
  })
  this.getMovies()
}

getMovies() {
  fetch('/api/movies/', {
    method: 'GET',
    headers: {},
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    this.setState({
      moviesLoaded: true,
      movieFeed: res.data.movies,
      userPageLoaded: false,
    })
  })
}


//PS - I wish you named it differently, the reason is on line 220
// LN - Grab a single movie by ref id
singleMovie(id) {
  fetch(`/api/movies/${id}`, {
    method: 'GET',
    headers: {},
  })
  .then(res => res.json())
  .then(res => {
    this.setState({
      selectedMovie: res.data.movies.movie,
      selectedComments: res.data.movies.comments,
      selectedRatings: res.data.movies.movie.ratings,
      singleLoaded: true,
      moviesLoaded: false,
      usersLoaded: true,
    })
  })
}


// AF - this function resets the preview window
resetPreview() {
  console.log('trying to reset')
  this.setState({
    dataLoaded: null,
    fetchedMovie: null,
  })
}


  render() {
    return (
      <div className="allcontainer">
        <Nav logout={this.props.logout} resetSelectedUser={this.resetSelectedUser} getOneUser={this.getOneUser} user={this.props.user}/>
          <div className="maincontainer">
             <div className="asidecontainer">
                {this.state.usersLoaded ?
                <UsersList usersList={this.state.usersList} getOneUser={this.getOneUser}/>
                : <p>Loading...</p> }
              </div>
              <div className="moviefeedcontainer">
                {this.state.moviesLoaded ?
                <Feed movieFeed={this.state.movieFeed} singleMovie={this.singleMovie} selectedUser={this.state.selectedUser} />
                : <SingleMovie singleMovie={this.singleMovie} selectedMovie={this.state.selectedMovie}
                selectedComments={this.state.selectedComments} selectedRatings={this.state.selectedRatings} /> }

              </div>
              <div className="addmoviecontainer">
                <AddMovie fetchMovie={this.fetchMovie} postMovie={this.postMovie} dataLoaded={this.state.dataLoaded} fetchedMovie={this.state.fetchedMovie} resetPreview={this.resetPreview}/>
              </div>
          </div>
      </div>
      )
  }
}


export default Main;

import React, { Component } from 'react';
import UsersList from './UsersList';
import AddMovie from './AddMovie';
import Feed from './Feed';
import Nav from './Nav';



class Main extends Component {
  constructor(props) {
  super(props);
  this.state = {
    usersLoaded: false,
    moviesLoaded: false,
    usersList: null,
    movieFeed: null,
    dataLoaded: false,
    fetchedMovie: null,
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
      this.getMovies()
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
    })
  })
}

// AF - this function resets the preview window
resetPreview() {
  this.setState({
    dataLoaded: null,
    fetchedMovie: null,
  })
}

  render() {
    return (
      <div className="allcontainer">
        <Nav logout={this.props.logout}/>
          <div className="maincontainer">
             <div className="asidecontainer">
                {this.state.usersLoaded ?
                <UsersList usersList={this.state.usersList} />
                : <p>Loading...</p> }
              </div>
              <div className="moviefeedcontainer">
                {this.state.moviesLoaded ?
                <Feed movieFeed={this.state.movieFeed} />
                : <p>Loading...</p> }
              </div>
              <div className="addmoviecontainer">
                <AddMovie fetchMovie={this.fetchMovie} postMovie={this.postMovie} dataLoaded={this.state.dataLoaded} fetchedMovie={this.state.fetchedMovie}/>
              </div>
          </div>
      </div>
      )
  }
}


export default Main;

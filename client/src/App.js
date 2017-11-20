import React, { Component } from 'react';
import './App.css';

//AF - setting up stateful class
class App extends Component {
  constructor() {
    super();
    this.state = {
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
    this.fetchMovie = this.fetchMovie.bind(this)
    this.postMovie = this.postMovie.bind(this)
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
  render() {
    return (
      <div className="App">
        <form className="input" onSubmit={this.fetchMovie}>
          <input type="text" name="title" placeholder="movie title"/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

export default App;

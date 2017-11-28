import React from 'react';
import MoviePreview from './MoviePreview';

const AddMovie = (props) => {
  return (
    <div className="addmovieall">
      <h1>Add Movie</h1>
    <div className="addmoviecontainer">
      <div className="moviesubmit">
       <form className="input" onSubmit={props.fetchMovie}>
          <input type="text" name="title" placeholder="movie title"/>
          <input type="submit" value="search"/>
      </form>
      <MoviePreview dataLoaded={props.dataLoaded} fetchedMovie={props.fetchedMovie}
      fetchMovie={props.fetchMovie} postMovie={props.postMovie} resetPreview={props.resetPreview} />
      </div>
    </div >
  </div>
    )
  }

export default AddMovie;

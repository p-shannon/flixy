import React from 'react';
import MoviePreview from './MoviePreview';

const AddMovie = (props) => {
  return (
    <div className="addmoviecontainer">
      <div className="moviesubmit">
       <form className="input" onSubmit={props.fetchMovie}>
          <input type="text" name="title" placeholder="movie title"/>
          <input type="submit" value="submit"/>
      </form>
      <MoviePreview dataLoaded={props.dataLoaded} fetchedMovie={props.fetchedMovie}
      fetchMovie={props.fetchMovie} postMovie={props.postMovie} />
      </div>
    </div>
    )
  }

export default AddMovie;

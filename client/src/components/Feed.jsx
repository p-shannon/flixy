import React from 'react';

const Feed = (props) => {
  return (
    <div className="feedcontainer">
    {props.movieFeed.map(movie => {
      return (
        <div className="moviecontainer" key={movie.id}>
        <h1>{movie.username}</h1>
        <img src={movie.poster} />
        <p>{movie.title} ({movie.year})</p>
        </div>)
      })}
    </div>
    )
}

export default Feed;

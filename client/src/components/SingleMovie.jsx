import React from 'react'

const SingleMovie = (props) => {
  console.log(props.selectedMovie)
  console.log(props.selectedComments)
  console.log(props.selectedRatings)
  const ratings = props.selectedRatings[2]

  return (
    <div className="singlemovie">
        <h1>{props.selectedMovie.title} ({props.selectedMovie.year})</h1>
        <img src={props.selectedMovie.poster} />
        <h3>Director: {props.selectedMovie.director}</h3>
        <h3>Genre: {props.selectedMovie.genre}</h3>
        <h2>{props.selectedMovie.plot}</h2>
        <h3>Rated: {props.selectedMovie.rated}</h3>
        <h3>Reviews: {ratings}</h3>
        <div className="commentcontainer">
        {props.selectedComments.map(comment => {
          return (
            <h3>Comment: {comment.body}</h3>
            )
          })
        }
        </div>
        </div>
    )
  }

export default SingleMovie



import React from 'react';


const AddMovie = (props) => {
  return (
    <div className="addmoviecontainer">
      <div className="moviesubmit">
       <form className="input" onSubmit={props.fetchMovie}>
          <input type="text" name="title" placeholder="movie title"/>
          <input type="submit" value="submit"/>
      </form>
      </div>
    </div>
    )
  }

export default AddMovie;

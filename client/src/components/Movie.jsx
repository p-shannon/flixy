import React from 'react';


const Movie = (props) => {
  return (
    <div className="container">
      <div className="logout">
      <nav>
        <ul>
          <li><button className="logout" onClick={props.logout}>Logout</button></li>
        </ul>
      </nav>
      </div>
      <div className="moviesubmit">
       <form className="input" onSubmit={props.fetchMovie}>
          <input type="text" name="title" placeholder="movie title"/>
          <input type="submit" value="submit"/>
      </form>
      </div>
    </div>
    )
  }

export default Movie;

import React from 'react';

import { Link } from 'react-router-dom';

const Movie = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li><button className="logout" onClick={props.logout}>Logout</button></li>
        </ul>
      </nav>
    </header>
    )
  }

export default Movie;

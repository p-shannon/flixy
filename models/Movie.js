//LN-requiring db config file
const db = require('../db/config');

//LN-initializing empty movie object
const Movie = {};

//LN-getting all movies from flixy db
//PS-And attaches the user that added the movie to the query
Movie.findAll = () => {
  //PS - "Get in the ship M-morty, I'll expl- *burp* I'll explain on line 85 ! Hurry Morty!"
  return db.query(`with last_comments as (SELECT max(timestamp) as timestamp, movie_id from comments group by movie_id)

    SELECT 
    movies.*, comments.body as last_comment, comments.user_id as last_commenter_user_id, users.id as user_id, users.username
    FROM movies 
    join users on (movies.user_id = users.id)
    left join last_comments on (movies.id = last_comments.movie_id)
    left join comments on (comments.timestamp = last_comments.timestamp) 
    order by movies.timestamp desc`)
}

//AF-grab movies by ID
//PS - WITH COMMENTS !!!11!!!!1!!
Movie.findById = id => {
  ////PS - We're doing a nested query, Thanks Drake for demonstrating nested queries for me
  //PS - first grab the movie
  return db.one(`SELECT 
    movies.*, users.id as user_id, users.username, users.firstname, users.lastname
    FROM movies join users on (movies.user_id = users.id) WHERE movies.id = $1`, [id])
  //PS - Then send it down the next layer...
  .then(movie => {
    console.log(JSON.stringify(movie))
    //PS - grab all comments for the movie...
    return db.query('select * from comments where movie_id = $1 order by timestamp ASC', [id])
    //PS - Then pass that down to the next layer (movie is still in scope)
    .then(comments => {
      //PS - Return the object containing both things
      return {
        movie: movie,
        comments: comments,
      }
      //PS - the results are fuckin' gorgeous
    })
  })
}

//AF-adds a new movie to the database
Movie.create = movie => {
  return db.one(`
    INSERT INTO movies (
      title, year, poster, director, genre, runtime, rated, plot, ratings, user_id,timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *`, [movie.title, movie.year, movie.poster, movie.director, movie.genre, movie.runtime, movie.rated, movie.plot, movie.ratings,movie.user,movie.timestamp]);
}

//AF-update movie based on its ID
Movie.update = movie => {
  return db.one(`
    UPDATE movie
    SET
      title = $1,
      year = $2,
      poster = $3,
      director = $4,
      genre = $5,
      runtime = $6,
      rated = $7,
      plot = $8,
      ratings = $9
      WHERE id = $10
      RETURNING *
    `, [movie.title, movie.year, movie.poster, movie.directory, movie.genre, movie.runtime, movie.rated, movie.plot, movie.ratings]);
};

//AF-delete movie based on its ID
Movie.destroy = id => {
  return db.none(`
    DELETE FROM movies
    WHERE id = $1
    `, [id])
}

//LN-exporting Movie model
module.exports = Movie;

/*PS - So about line 11 the 'With as' clause in
  a psql query is used for setting up a table 
  for use with another table. So we create a 
  table out of comments that only grabs the 
  latest comment 'max()' (Also remember that 
  unix timestamps are in miliseconds since some 
  time in september 1970) for rows that have 
  the same movie_id. Then we make our queries 
  with the usual join table syntax making sure 
  to join the comments table with the latest 
  comment table (on timestamp because 
  timestamps are somewhat unique and because we 
  want the rest of the information that the 
  'with as' table omits). To make sure that 
  entries without latest_comments are still 
  added, we simply add the 'left' qualifier for 
  the join clause. This produces a desired 
  result.

  links: https://stackoverflow.com/a/39603110 //With as elaboration
         http://www.postgresqltutorial.com/postgresql-left-join/ //left join
  */
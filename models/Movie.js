//LN-requiring db config file
const db = require('../db/config');

//LN-initializing empty movie object
const Movie = {};

//LN-getting all movies from flixy db
Movie.findAll = () => {
  return db.query(`SELECT * FROM movies`)
}

//AF-grab movies by ID
Movie.findById = id => {
  return db.one(`
    SELECT * FROM movies
    WHERE id = $1`, [id])
}

//AF-adds a new movie to the database
Movie.create = movie => {
  return db.one(`
    INSERT INTO movies (
      title, year, poster, director, genre, runtime, rated, plot, ratings)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`, [movie.title, movie.year, movie.poster, movie.director, movie.genre, movie.runtime, movie.rated, movie.plot, movie.ratings]);
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

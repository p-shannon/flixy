//LN-requiring db config file
const db = require('../db/config');

//LN-initializing empty movie object
const Movie = {};

//LN-getting all movies from flixy db
Movie.findAll = () => {
  return db.query(`SELECT * FROM movies`)
}

//LN-exporting Movie model
module.exports = Movie;

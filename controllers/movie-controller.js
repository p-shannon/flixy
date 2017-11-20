//LN-requiring our movie model
const Movie = require('../models/Movie');

//LN - movie controller as an empty object
const movieController = {};

//LN-function that grabs all the movies from the database
movieController.index = (req, res) => {
  Movie.findAll()
  .then(movies => {
    //LN-sets response status to 200 and sends movies as json object
    res.status(200).json({
      message: 'ok',
      data: {
        movies: movies,
      }
    })
  //LN - sets up a catch 500 error for the server
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
};

//LN-exports moviecontroller
module.exports = movieController;

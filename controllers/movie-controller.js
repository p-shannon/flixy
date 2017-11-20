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

//AF-function that grabs movies by ID
movieController.show = (req, res) => {
  Movie.findById(req.params.id)
  .then(movie => {
    res.status(200).json({
      message: 'ok',
      data: {
        movies: movies,
      }
    });
  }).catch(err => {
  console.log(err);
  res.status(500).json({error: err});
  });
};

//AF-function that adds movies to our database
movieController.create = (req, res, next) => {
  console.log(req.body)
  Movie.create({
    title:    req.body.title,
    year:     req.body.year,
    poster:   req.body.poster,
    director: req.body.director,
    genre:    req.body.genre,
    runtime:  req.body.runtime,
    rated:    req.body.rated,
    plot:     req.body.plot,
    ratings:  req.body.ratings,
  })
  .then(movie => {
    res.status(201).json({
      message: 'Movie successfully added',
      data: {
        movie: movie,
      },
    });
  }).catch(err => {
  console.log(err);
  res.status(500).json({error: err});
  });
};

//AF-function that updates movie by ID
movieController.update = (req, res, next) => {
  Movie.update({
    title:    req.body.title,
    year:     req.body.year,
    poster:   req.body.poster,
    director: req.body.director,
    genre:    req.body.genre,
    runtime:  req.body.runtime,
    rated:    req.body.rated,
    plot:     req.body.plot,
    ratings:  req.body.ratings,
  }, req.params.id)
  .then(movie => {
    res.status(202).json({
      message: 'Updated successfully',
      data: {
        movies: movies,
      },
    });
  }).catch(err => {
  console.log(err);
  res.status(500).json({error: err});
  });
};

//AF-function that deletes movie from db by ID
movieController.delete = (req, res, next) => {
  Movie.destroy(req.params.id)
  .then(() => {
    res.status(202).json({
      message: 'Deleted successfully',
    });
  }).catch(err => {
  console.log(err);
  res.status(500).json({error: err});
  });
};

//LN-exports moviecontroller
module.exports = movieController;

//LN-requiring express
const express = require('express');

//LN-creating router instance
const movieRouter = express.Router();
//LN-requiring movie-controller
const movieController = require('../controllers/movie-controller');

//LN-creating get request on root route that returns findall model method
movieRouter.get('/', movieController.index);

//AF-get route for movies by ID
movieRouter.get('/:id', movieController.show)

//AF-post route to add a movie to the db
movieRouter.post('/', movieController.create)

//AF-put route to update movie by ID
movieRouter.put('/:id', movieController.update)

//AF-delete route that removes movie from db by ID
movieRouter.delete('/:id', movieController.delete)

//LN-exports movieRouter
module.exports = movieRouter;

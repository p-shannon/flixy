//LN-requiring express
const express = require('express');

//LN-creating router instance
const movieRoutes = express.Router();
//LN-requiring movie-controller
const movieController = require('../controllers/movie-controller');
//PS - and the comment controller (for posting)
const commentController = require('../controllers/comment-controller')

//LN-creating get request on root route that returns findall model method
movieRoutes.get('/', movieController.index);

//AF-get route for movies by ID
movieRoutes.get('/:id', movieController.show)

//AF-post route to add a movie to the db
movieRoutes.post('/', movieController.create)

//AF-put route to update movie by ID
movieRoutes.put('/:id', movieController.update)

//AF-delete route that removes movie from db by ID
movieRoutes.delete('/:id', movieController.delete)

//PS - route for posting a comment on a movie
movieRoutes.post('/:id',
	commentController.create)

//LN-exports movieRoutes
module.exports = movieRoutes;

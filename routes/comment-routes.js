////PS - This file will handle routing for comments, this will definitely see revision in it's lifetime.
//PS - Grab express
const express = require('express')
//PS - Creating router instance
const commentRoutes = express.Router()
//PS - import the controller
const commentController = require('../controllers/comment-controller')

//PS - route for displaying all comments on a movie
commentRoutes.get('/movie/:movie_id', commentController.movieIndex)

//PS - route for posting a comment on a movie
commentRoutes.post('/movie/:movie_id',
	commentController.create)

//PS - route for destroying all comments on a movie
commentRoutes.delete('/movie/:movie_id',
	commentController.deleteAll)

//PS - route for grabbing a single comment
commentRoutes.get('/:id',
	commentController.show)

//PS - route for editing a single comment
commentRoutes.put('/:id',
	commentController.edit)

//PS - route for destroying a single comment
commentRoutes.delete('/:id',
	commentController.delete)

//PS - export it
module.exports = commentRoutes
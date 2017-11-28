////PS - This file will handle routing for comments, this will definitely see revision in it's lifetime.
//PS - Grab express
const express = require('express')
//PS - Creating router instance
const commentRoutes = express.Router()
//PS - import the controller
const commentController = require('../controllers/comment-controller')

//PS - route for editing a single comment
commentRoutes.put('/:id',
	commentController.edit)

//PS - route for destroying a single comment
commentRoutes.delete('/:id',
	commentController.delete)

//PS - route for destroying all comments on a movie
commentRoutes.delete('/all/movie/:movie_id',commentController.deleteAll)

//PS - export it
module.exports = commentRoutes
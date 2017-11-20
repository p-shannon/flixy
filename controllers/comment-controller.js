////PS - This file is going to handle the fetch requests made to this part of the API
//PS - Import the model
const Comment = require('../models/Comment')
//PS - Initialize the object
const commentController = {}

//PS - Index the comments of a certain movie
commentController.movieIndex = (req,res) => {
	Comment.findAllByMovieId(req.params.movie_id)
	.then(data => {
		res.status(200).json({
			message: 'ok',
			data: data,
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - Show a single comment (Don't know why we'd need this)
commentController.show = (req,res) => {
	Comment.findById(req.params.id)
	.then(data => {
		res.status(200).json({
			message: 'ok',
			data: data,
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - create a single comment
commentController.create = (req,res) => {
	Comment.create({
		body: req.body.body, /*PS - FORGIVE CODE GOD!!!!1*/
		timestamp: Date.now(),
		movie_id: req.params.movie_id
	}).then(data => {
		res.status(200).json({
			message: 'Created successfully',
			data: data,
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - edit a single comment
commentController.edit = (req,res) => {
	Comment.edit({
		body: req.body.body,
		id: req.params.id
	}).then(data => {
		res.status(200).json({
			message: 'Edited successfully',
			data: data,
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - remove a single comment
commentController.delete = (req,res) => {
	Comment.delete(req.params.id)
	.then(() => {
		res.status(200).json({
			message: 'Deleted successfully',
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - KILL ALL THE COMMENTS!!!
commentController.deleteAll = (req,res) => {
	Comment.deleteAll(req.params.movie_id)
	.then(() => {
		res.status(200).json({
			message: 'Deleted successfully',
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
}

//PS - Exports the file
module.exports = commentController
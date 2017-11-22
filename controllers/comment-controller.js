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
		movie_id: req.params.movie_id,
		user_id: req.user.id,
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

//PS - edit a single comment if the current user matches the user_id of the target comment
commentController.edit = (req,res) => {
	//PS - first find the desired comment
	Comment.findById(req.params.id)
	.then(comment => {
		//PS - then, if the comment's user ID is equal to the current user's id, then make the changes.
		if(comment.user_id === req.user.id){
			Comment.edit({
				body: req.body.body,
				id: req.params.id
			//PS - Also return the new comment.
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
		//PS - else, deny them
		else{
			res.status(403).json({
				message: 'Not allowed to edit other\'s comments.',
				data: null,
			})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})
	/* ORIGINAL WORKING!!!1!!
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
	*/
}

//PS - remove a single comment if the owner wants it gone...
commentController.delete = (req,res) => {
	//PS - grab the comment
	Comment.findById(req.params.id)
	.then(comment => {
		//PS - then, if the comment's user ID is equal to the current user's id, destroy it
		if(comment.user_id === req.user.id){
			Comment.delete(req.params)
			.then(() => {
				res.status(200).json({
					message: 'Comment Deleted successfully',
					data: null,
				})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err,
				})
			})
		}
		//PS - else, deny them
		else{
			res.status(403).json({
				message: 'Not allowed to delete other\'s comments.',
				data: null,
			})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			error: err,
		})
	})

	/*
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
	*/
}

//PS - KILL ALL THE COMMENTS!!!
//PS - !!THERE WILL BE NO SAFETY CHECK ON THIS PARTICULAR CALL, BE CAREFUL WITH THIS!!
commentController.deleteAll = (req,res) => {
	Comment.deleteAll(req.params.movie_id)
	.then(() => {
		res.status(200).json({
			message: 'All comments deleted successfully',
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
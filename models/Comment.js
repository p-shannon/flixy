////PS - This file is gunna handle the psql queries to the the database relating to comments
/*PS - !!TODO: Loop back around and add users to the fray!!*/
//PS - Import the database
const db = require('../db/config')
//PS - Initialize with an empty object
const Comment = {};

//PS - grab all comments on a given movie
Comment.findAllByMovieId = id => {
	////PS - We're doing a nested query, Thanks Drake for demonstrating nested queries for me
	//PS - first grab the movie
	return db.one('select * from movies where id = $1', [id])
	//PS - Then send it down the next layer...
	.then(movie => {
		//PS - grab all comments for the movie...
		return db.query('select * from comments where movie_id = $1', [id])
		//PS - Then pass that down to the next layer (movie is still in scope)
		.then(comments => {
			//PS - Return the object containing both things
			return {
				movie: movie,
				comments: comments,
			}
			//PS - the results are fuckin' gorgeous
		})
	})
}

//PS - grab a single comment
Comment.findById = id => {
	return db.one('select * from comments where id = $1',[id])
}

//PS - create a single comment
Comment.create = comment => {
	return db.one(`INSERT INTO comments 
		(body,timestamp,movie_id,user_id) 
		VALUES($1,$2,$3) 
		RETURNING *`,
		[comment.body, comment.timestamp, comment.movie_id,comment.user_id])
}

//PS - edit a single comment
Comment.edit = comment => {
	return db.one(`
		UPDATE comments SET 
		body = $1
		WHERE id = $2
		RETURNING *
		`,[comment.body,comment.id])
}

//PS - remove a single comment
Comment.delete = id => {
	return db.none(`
		DELETE FROM comments WHERE id = $1
	`,[id])
}

//PS - remove all comments from a movie (important for removing movies)
Comment.deleteAll = movie_id => {
	return db.none(`
		DELETE FROM comments WHERE movie_id = $1
	`,[movie_id])
}

//PS - export the file for others to use.
module.exports = Comment;

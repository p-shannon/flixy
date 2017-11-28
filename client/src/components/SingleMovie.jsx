import React, { Component } from 'react'

////PS - The following code was hodgepodged between myself and an anonymous coder who hates comments.
//PS - makes the singlemovie component into a stateful one.
class SingleMovie extends Component {
	//PS - construct it properly, as it does recieve props
	constructor(props){
		super(props)
		console.log("SingleMovie's props",props)
  		//PS - Handle the states for the form submissions
  		this.state = {
  			selectedComment: null,
  			comment: '',
  			newComment: '',
  		}
  		//PS - bind the things we're going to pass down
  		this.handleChanges = this.handleChanges.bind(this)
  		this.handleSubmission = this.handleSubmission.bind(this)
  		this.selectComment = this.selectComment.bind(this)
  		this.deselectComment = this.deselectComment.bind(this)
  		this.deleteComment = this.deleteComment.bind(this)
  		this.decideIfDeleteable = this.decideIfDeleteable.bind(this)
  		this.deleteMovie = this.deleteMovie.bind(this)
	}

	//PS - Needed for auto focusing the 
	componentDidUpdate(){
		console.log('ding!')
		console.log(this.state.selectedComment)
		if(!(this.state.selectedComment===null)){
			console.log('bing!')
			document.querySelector('#editcommentform textarea').focus()
		}    			
	}

	//PS - handle the changes in the edit comment component box
	handleChanges(e){
		//PS - You know... like a typewriter...
		console.log('tick.')
		//PS - create a change object...
		let changes = {}
		//PS - put the changes from the changee into the object...
		changes[e.target.name] = e.target.value
		//PS - chuck it into state.
		this.setState(changes)
		console.log(this.state.comment)

	}

	//PS - handle the submission of the new comment
	handleSubmission(e, id){
		//PS - Don't fucking refresh the page, you asshole!!!1!!
		e.preventDefault()
		//PS - Make that glorious backend work.
		fetch(`/api/movies/${id}`,{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				body: this.state.newComment,
			})
		}).then(() => {
			//PS - Refresh the comments feed
			this.props.singleMovie(id);
			//PS - Clear the comment box.
			this.setState({
				comment: "",
				newComment: "",
			})
			document.querySelector('#newcommentform').reset()
		})
	}

	//PS - handle the submission of the edited comment
	handleEditSubmission(e, id, movieId){
		e.preventDefault()
		//PS - Make that glorious backend work again.
		fetch(`/api/comments/${id}`,{
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				body: this.state.comment,
			})
		}).then(() => {
			//PS - Clear the comment box.
			this.setState({
				selectedComment: null,
				comment: "",
				newComment: "",
			})
			//PS - Refresh the comments feed
			this.props.singleMovie(movieId);
			//document.querySelector('#editcommentform').reset()
		})
	}

	//PS - handle the deletion of a comment
	deleteComment(id, movieId){
		//PS - Keep workin' that glorious backend.
		fetch(`/api/comments/${id}`,{
			method: 'DELETE',
			credentials: 'include',	
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(() => {
			//PS - Refresh the comments feed
			this.props.singleMovie(movieId);
			//document.querySelector('#editcommentform').reset()
		})
	}

	//PS - handle the deletion of a movie
	deleteMovie(id){
		//PS - delete all comments from the movie...
		fetch(`/api/comments/all/movie/${id}`,{
			method: 'DELETE',
			credentials: 'include',	
			headers: {
				'Content-Type': 'application/json'
			},
		//PS - then delete the movie
		}).then(() => {
			console.log('the value of id is',id)
			fetch(`/api/movies/${id}`,{
			method: 'DELETE',
			credentials: 'include',	
			headers: {
				'Content-Type': 'application/json'
			},
			})
		})
		//PS - then take us back the flixy feed
		.then(()=>{
			console.log('it\'s done...')
			this.props.resetSelectedUser()
		})
	}

	//PS - function for selecting a comment
	selectComment(comment){
		//PS - Put it in state
		this.setState({
			selectedComment: comment,
			comment: comment.body,
		})
	}

	//PS - deselect comment
	deselectComment(){
		this.setState({
			selectedComment: null,
		})
	}

	//PS - only show the delete movie button if the user who owns it is viewing it
	decideIfDeleteable(){
		if(this.props.user.id === this.props.selectedMovie.user_id){
			return(
				<h3 id="deletemovie" onClick={()=>{this.deleteMovie(this.props.selectedMovie.id)}}>Delete Movie</h3> 
			)
		}
		else{
			return(
				null
			)
		}
	}

	//PS - render the movie, its comments, and a new comment box
 	render(){
	  return (
	    <div className="singlemovie">
	        <div className="singlemovieall">
	         <h1>{this.props.selectedMovie.title} ({this.props.selectedMovie.year})</h1>
           <div className="singlemoviecontainer">
	         <img src={this.props.selectedMovie.poster} />
           <div className='singlemovietext'>
	         <h3>Genre: {this.props.selectedMovie.genre}</h3>
           <h3>Director: {this.props.selectedMovie.director} </h3>
	         <h2>{this.props.selectedMovie.plot}</h2>
	         <h3>RATED: {this.props.selectedMovie.rated}</h3>
	         <h3>ROTTEN TOMATOES: {this.props.selectedRatings}</h3>
	         {this.decideIfDeleteable()}
           </div>
	        <div className="commentcontainer">
            <h2>Comments</h2>
	        {this.props.selectedComments.map(comment => {
			//PS - I know there's a better way to do this, I just don't know how to do it...    
			    //PS - If the current user matches the comment's user id, we're going to put the onclick listener on the comments...
			    if(this.props.user.id === comment.user_id){    
			        //PS - If nothing's selected...
			        if(!this.state.selectedComment){
			        	//PS - post the comment, wait for clicks...
			          	return (
			            	<h3 key={comment.id}> {this.props.user.username}: {comment.body} <span onClick={()=>{this.selectComment(comment)}}>edit</span> <span onClick={()=>{this.deleteComment(comment.id,comment.movie_id)}}>delete</span></h3>
			            )
			        }
			        //PS - if something's selected and it's us...
			        else if(comment.id === this.state.selectedComment.id){
			        	//PS - show the edit form
			        	return (
			        		<div className="formcontainer">
			        		<form id="editcommentform" onSubmit={(e)=>{this.handleEditSubmission(e, comment.id, this.props.selectedMovie.id)}}>
		        				<textarea name="comment" onKeyDown={(e)=>{if(e.keyCode === 27){this.deselectComment()}}} onChange={(e)=>{this.handleChanges(e)}} value={this.state.comment}/>
		        				<input type="submit" value="Post!"/>
		        			</form>
		        			</div>
			        	)
			        }
			        //PS - else, wait for clicks...
			        else{
			        	return (
			            	<h3 key={comment.id}>{this.props.user.username}: {comment.body} <span onClick={()=>{this.selectComment(comment)}}>edit</span> <span onClick={()=>{this.deleteComment(comment.id,comment.movie_id)}}>delete</span></h3>
			            )
			        }
			    }
			    //PS - if the current comment belongs to a different user...
			    else{
			    	//PS - don't be clickable
			    	return (
			            <h3 key={comment.id}>{this.props.user.username}: {comment.body}</h3>
			        )
			    }
	          })
	        }
	        <div className="formcontainer">
	        <form id="newcommentform" onSubmit={(e)=>{this.handleSubmission(e, this.props.selectedMovie.id)}}>
	        	<textarea name="newComment" placeholder="Write a comment!" onClick={this.deselectComment} onChange={(e)=>{this.handleChanges(e)}} value={this.state.newComment}/>
	        	<input type="submit" value="Post!"/>
	        </form>
	        </div>
	        </div>
	        </div>
	    </div>
	    )
	}
}

export default SingleMovie



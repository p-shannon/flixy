import React, { Component } from 'react'

////PS - The following code was hodgepodged between myself and an anonymous coder who hates comments.
//PS - makes the singlemovie component into a stateful one.
class SingleMovie extends Component {
	//PS - construct it properly, as it does recieve props
	constructor(props){
		super(props)
		//PS - Shenanigans I didn't write goes here
		  console.log(props.selectedMovie)
  		console.log(props.selectedComments)
  		console.log(props.selectedRatings)

  		//PS - </shenanigans>
  		//PS - Handle the states for the form submissions
  		this.state = {
  			selectedComment: null,
  			comment: '',
  		}
  		//PS - bind the things we're going to pass down
  		this.handleChanges = this.handleChanges.bind(this)
  		this.handleSubmission = this.handleSubmission.bind(this)
	}

	//PS - handle the changes in the edit comment component box
	handleChanges(e){
		//PS - You know... like a typewriter...
		console.log('tick.')
		this.setState({
			//PS - make the state equal to the value of the box that triggered it.
			comment: e.target.value,
		})
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
				body: this.state.comment,
			})
		}).then(() => {
			//PS - Refresh the comments feed
			this.props.singleMovie(id);
			//PS - Clear the comment box.
			this.setState({
				comment: "",
			})
			document.querySelector('#newcommentform').reset()
		})
	}

	//PS - Here's the render. We do a bunch of shit that I didn't write and I'm probably not going to explain t'ill later.
 	render(){
	  return (
	    <div className="singlemovie">
	        <h1>{this.props.selectedMovie.title} ({this.props.selectedMovie.year})</h1>
	        <img src={this.props.selectedMovie.poster} />
	        <h3>Director: {this.props.selectedMovie.director}</h3>
	        <h3>Genre: {this.props.selectedMovie.genre}</h3>
	        <h2>{this.props.selectedMovie.plot}</h2>
	        <h3>Rated: {this.props.selectedMovie.rated}</h3>
	        <h3>Rotten Tomatoes: {this.props.selectedRatings}</h3>
	        <div className="commentcontainer">
	        {this.props.selectedComments.map(comment => {
	          return (
	            <h3 key={comment.id}>Comment: {comment.body}</h3>
	            )
	          })
	        }
	        <form id="newcommentform" onSubmit={(e)=>{this.handleSubmission(e, this.props.selectedMovie.id)}}>
	        	<textarea placeholder="Write a comment!" onChange={(e)=>{this.handleChanges(e)}} value={this.state.comment}/>
	        	<input type="submit" value="Post!"/>
	        </form>
	        </div>
	    </div>
	    )
	}
}

export default SingleMovie



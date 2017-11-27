import React from 'react'

//AF - if no movie has been fetched, component will return an empty div; otherwise, it will rendered the fetched movie
//AF - searching a new movie clears the previous movie
const MoviePreview = props => {
	if (!props.dataLoaded || !props.fetchedMovie.Title) {
	return(
		<div className="previewcontainer"></div>
		)
	} else {
		//AF - click on 'add movie' to post movie to local db.
		//AF - adding movie clears the preview field
		return(
			<div className="previewcontainer">
				<img className="posterpreview" alt="" src={props.fetchedMovie.Poster}/>
				<p className="preview">{props.fetchedMovie.Title} ({props.fetchedMovie.Year})</p>
				<p className="preview">Director: {props.fetchedMovie.Director}</p>
				<p className="preview">Genre: {props.fetchedMovie.Genre}</p>
				<p className="preview">Runtime: {props.fetchedMovie.Runtime}</p>
				<p className="preview">Plot: {props.fetchedMovie.Plot}</p>
				<div className="previewmovie addmoviebutton" onClick={props.postMovie}>add movie</div>
				<div className="previewmovie clearmoviebutton" onClick={props.resetPreview}>clear movie</div>
			</div>
		)
	}
}

export default MoviePreview

import React from 'react';


const Feed = (props) => {
  //PS - if we received a selectedUser prop
  if (props.selectedUser){
    //PS - combine the posted movies and comments, and sort them chronologically
    let postings = mergeThenSortChronologically(props.selectedUser.movies,props.selectedUser.comments)
    //PS - render the user feed
    return (
      <div className="moviefeedall">
        <h1>{props.selectedUser.user.username}'s feed</h1>
      <div className="feedcontainer">
      {/*PS - for each post in postings...*/}
      {postings.map((post,index) => {
          //PS - TODO: Make sure these are clickable in the same way they're clickable in single movie view.
          //PS - if the post doesn't have a body, then it's a movie, treat it like one.
          if(!post.body){
            return (
              <div className="moviecontainer" key={index} onClick={() => {props.singleMovie(post.id)}}>
                <h2>{props.selectedUser.user.username}</h2>
                <img alt="" src={post.poster} />
                <p>{post.title} ({post.year})</p>
                <p>GENRE: {post.genre}</p>
                <p>DIRECTOR: {post.director}</p>
                <p>{post.runtime}</p>
              </div>
            )
          }
          //PS - if the post has a body property, it's a comment. So treat it differently.
          else{
            return (
              <div className="comment" key={index}>
                <h2>{props.selectedUser.user.username} posted</h2>
                <p>"{post.body}" <br/>on {post.title} ({post.year})</p>
                {/*PS - Want to be able to grab the movie's poster, but that's a lil tricky and will be saved for a refactor*/}
              </div>
            )
          }
        })}
      </div>
    </div>
    )
  }
  else{
    return (
      <div className="moviefeedall">
        <h1>Flixy feed</h1>
      <div className="feedcontainer">
      {props.movieFeed.map(movie => {
        return (
          <div className="moviecontainer" key={movie.id} onClick={() => {props.singleMovie(movie.id)}}>
          <h2>{movie.username}</h2>
          <h3>{movie.title} ({movie.year})</h3>
          <img alt="" src={movie.poster} />
          <h3>GENRE: {movie.genre}</h3>
          <h3>DIRECTOR: {movie.director}</h3>
          <h3>{movie.runtime}</h3>
          {movie.last_comment ? <h4>{movie.username}: {movie.last_comment}</h4>
          : null }
          </div>)
        })}
      </div>
    </div>
    )
  }
}

////PS - A sorting function is neccasary for the userfeed to display the requested content properly
//PS - Declare a function that takes two arrays...
function mergeThenSortChronologically(a,b){
  //PS - and merges them
  let working = a.concat(b)
  //PS - Now that we only have one array, We can sort them properly
  working.sort(function(a, b){return b.timestamp - a.timestamp}) //PS - That compare function in sort is used to specifically compare the timestamp properties in the objects in the array, and sort them by descending order. a is the smaller value, b is the larger value.
  //PS - send it out for whatever called it.
  console.log('User\'s postings sorted:',working)
  return working
}

export default Feed;

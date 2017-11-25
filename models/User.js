//LN-requiring db config file
const db = require('../db/config');

//LN-initializing empty object of User
const User = {};

//LN-finding all users
//PS - While omitting the password digests.
User.findAll = () => {
  return db.query(`SELECT id, username, firstname, lastname FROM users order by id asc`)
};

//LN-finding one user
User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `, [userName]);
};

//LN-creating a user
User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, password_digest, firstname, lastname)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [user.username, user.password_digest, user.firstname, user.lastname]);
};

////PS - Show a users doings
//PS - credit to LN for laying the groundwork for this
User.showAllByUser = id => {
  //PS - Grab the user...
  return db.oneOrNone(`
    SELECT id, username, firstname, lastname FROM users
    WHERE id = $1
  `,[id])
  //PS - Then the movies, ala movie index style
  .then(user => {
    //PS - Please refer to Movie.js line 85 if you need an explaination
    return db.query(`
      with last_comments as (SELECT max(timestamp) as timestamp, movie_id from comments group by movie_id)

      SELECT 
      movies.*, comments.body as last_comment, comments.user_id as last_commenter_user_id, users.id as user_id, users.username
      FROM movies 
      join users on (movies.user_id = users.id)
      left join last_comments on (movies.id = last_comments.movie_id)
      left join comments on (comments.timestamp = last_comments.timestamp)
      WHERE movies.user_id = $1 
      order by movies.timestamp desc
    `,[id])
    //PS - then grab the comments
    .then(movies => {
      return db.query(`
        SELECT comments.*, movies.title, movies.year from comments join movies on (movies.id = comments.movie_id)
        WHERE movies.user_id = $1
        order by comments.timestamp desc
      `,[id])
      //PS - Combine the results into one big beautiful object.
      .then(comments => {
        return {
          user,
          movies,
          comments
        }
      })
    })
  })
}

module.exports = User;

//LN-requiring db config file
const db = require('../db/config');

//LN-initializing empty object of User
const User = {};

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

//LN-finding comments made by one uer
User.findUserComments = id => {
  return db.manyOrNone(`
    SELECT * FROM comments
    WHERE user_id = $1
    `, [id]);
    }

//LN-finding movies made by one user
User.findUserMovies = id => {
  return db.manyOrNone(`
    SELECT * FROM movies
    WHERE user_id = $1
    `, [id]);
    }

module.exports = User;

//LN-requiring bcryptjs to encrypt and decrypt user passwords
const bcrypt = require('bcryptjs');
//LN-requiring User models
const User = require('../models/User');

//LN-initializing userscontroller as an empty object
const usersController = {};


//SH, AF, LN - finding all users in users to display on main
usersController.users = (req, res) => {
  User.findAll()
  .then(users => {
    res.status(200).json({
      message: 'ok',
      data: {
        users: users,
      }
    })
  })
}

//LN-finding all movies added by a user and all comments added by a user and rendering it on users/users-home
usersController.index = (req, res) => {
  User.findUserMovies(req.user.id)
  .then(movies => {
      User.findUserComments(req.user.id)
      .then(comments => {
        res.status(200).json({
          message: 'ok',
          data: {
          movies: movies,
          comments: comments,
          }
        })
      })
  })
}


//LN-creating a user for registration
usersController.create = (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password_digest: hash,
  }).then(user => {
    console.log('newly inserted user', user);
    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: 'user added',
        auth: true,
        data: {
          user: {
            //PS - Removes password digest from retun.
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
          }
        }
      })
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  })
}



//LN-exporting userscontroller
module.exports = usersController;

//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md

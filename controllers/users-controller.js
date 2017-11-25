//LN-requiring bcryptjs to encrypt and decrypt user passwords
const bcrypt = require('bcryptjs');
//LN-requiring User models
const User = require('../models/User');

//LN-initializing userscontroller as an empty object
const usersController = {};


//SH, AF, LN - finding all users in users to display on main
//PS - Changing the name of this from 'users' to 'index' as we want an index of users.
usersController.index = (req, res) => {
  User.findAll()
  .then(users => {
    res.status(200).json({
      message: 'ok',
      data: {
        users: users,
      }
    })
  })
  .catch(err => {
    res.status(500).json({
      message: "Not okay",
      error: err
    })
  })
}

//PS - for grabbing information about a particular user including their posts and stuffs.
usersController.showAllByUser = (req,res) => {
  User.showAllByUser(req.params.id)
  .then(data => {
    res.status(200).json({
      message: "User's postings retrieved successfully!",
      data: data,
    })
  })
  .catch(err => {
    res.status(500).json({
      message: "Not okay",
      error: err,
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

//PS - Big thank you to my team for laying the groundwork to allow me to go hard on this back-end, wouldn't be able to do this without them.

//LN-exporting userscontroller
module.exports = usersController;

//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md

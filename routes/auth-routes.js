//LN-requiring express
const express = require('express');
//LN-requiring express router
const authRouter = express.Router();
//LN-requiring passport
const passport = require('../services/auth/local');
//LN-requiring auth helpers
const authHelpers = require('../services/auth/auth-helpers');
//LN-requiring usersControllers methogs
const usersController = require('../controllers/users-controller');


//LN-post request to create a new user when they choose to register
authRouter.post('/register', usersController.create);

//LN-allowing the user to submit their login form
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/verify',
    failureRedirect: '/auth/verify',
    failureFlash: true,
  })
);

authRouter.get('/verify', (req, res) => {
  console.log('user',req.user)
  if (req.user) return res.status(200).json({
    message: 'ok',
    auth: true,
    data: {
      user: req.user,
    }
  });
  else return res.status(401).json({
    message: 'Login failed',
    auth: false,
    data: {
      user: null,
    }
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({
    message: 'logged out',
    auth: false,
    data: {
      user: null,
    }
  })
});


//LN-export userRoutess
module.exports = authRouter;

//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md


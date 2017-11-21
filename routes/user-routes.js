//LN-requiring express
const express = require('express');
//LN-requiring express router
const userRoutes = express.Router();
//LN-requiring auth helpers
const authHelpers = require('../services/auth/auth-helpers');
//LN-requiring usersControllers methogs
const usersController = require('../controllers/users-controller');


//LN-get request at the root to require login and trigger usersController function
// userRoutes.get('/', authHelpers.loginRequired, usersController.index);
userRoutes.get('/', usersController.index);

//SH, AF, LN- creating a route to get all users
userRoutes.get('/list', usersController.users);



module.exports = userRoutes;

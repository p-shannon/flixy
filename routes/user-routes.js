//LN-requiring express
const express = require('express');
//LN-requiring express router
const userRoutes = express.Router();
//LN-requiring auth helpers
const authHelpers = require('../services/auth/auth-helpers');
//LN-requiring usersControllers methogs
const usersController = require('../controllers/users-controller');

//SH, AF, LN- creating a route to get all users
//PS - Route changed to '/'
userRoutes.get('/', usersController.index);

//PS - Get things posted by a user
userRoutes.get('/:id', usersController.showAllByUser)

module.exports = userRoutes;

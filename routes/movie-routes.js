//LN-requiring express
const express = require('express');

//LN-creating router instance
const movieRouter = express.Router();
//LN-requiring movie-controller
const movieController = require('../controllers/movie-controller');

//LN-creating get request on root route that returns findall model method
movieRouter.get('/', movieController.index);

//LN-exports movieRouter
module.exports = movieRouter;

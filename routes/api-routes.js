////PS - This the primary router for our local api. So, for all subsequent files, imagine the routing to be `/api/<route>`
//PS - groob ooxprooss
const express = require('express');
//PS - initialize the router
const apiRoutes = express.Router();
//PS - require the other routers...
const movieRoutes = require('./movie-routes');
const userRoutes = require('./user-routes');

//PS - route appropriately
apiRoutes.use('/movies', movieRoutes);
apiRoutes.use('/users', userRoutes);

//PS - and export the router
module.exports = apiRoutes;
////PS - Begin initilizing our express server
//PS - grab express
const express = require('express');
//PS - grab the logger
const logger = require('morgan');
//PS - grab the pathing thing
const path = require('path');
//PS - grab body parser
const bodyParser = require('body-parser');
//PS - may not need this, but grab the method-override
const methodOverride = require('method-override');
//PS - grab the cookie-parser
const cookieParser = require('cookie-parser');
//PS - grab express session
const session = require('express-session');
//PS - Lastly, passport
const passport = require('passport');

////PS - begin instantiatiaing the things and the stuffs
//PS - instantiate express up
const app = express();
//PS - Do a thing with .env??/?/?
require('dotenv').config();
//PS - Define the port and begin listening to it
const PORT = process.env.PORT || 3001 /*PS - 3001!!!!!!*/
//PS - Tell the server to listen on an port and tell us it's doing so.
app.listen(PORT, function(){
	console.log(`Listening on ${PORT}, knock em dead!`)
})

////PS - begin running the middlewares
//PS - start the logger
app.use(logger('dev'));
//PS - set up the path to the public folder
app.use(express.static(path.join(__dirname,'public')));
//PS - let the bodies parse the floor
app.use(bodyParser.json());
//PS - I don't know what this shit does
app.use(bodyParser.urlencoded({extended:false}));
//PS - Grabs method override
app.use(methodOverride('_method'));
//PS - parse dem cookies!
app.use(cookieParser());
//PS - start the auth session
app.use(session({
  key: process.env.SECRET_KEY,
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//AF - will need to set up app.use to the API route here

////PS - API route
//PS - grab it...
const apiRoutes = require('./routes/api-routes');
//PS - use it...
app.use('/api',apiRoutes);

////PS - Auth route
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

//AF - error catcher
app.use('*', (req,res) => {
  res.status(404).send('Not found');
});











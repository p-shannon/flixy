//LN - requiring passport
const passport = require('passport');
//LN- requiring User model
const User = require('../../models/User');


//LN-passport handling authentification
module.exports = () => {
  //LN- called when the user first logs in and stores their username for the time they are logged in
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

//LN-pulls user info on every request
  passport.deserializeUser((username, done) => {
    User.findByUserName(username)
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });
};

//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md


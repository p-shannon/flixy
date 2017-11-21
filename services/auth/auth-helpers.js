//LN-requiring bcryptjs
const bcrypt = require('bcryptjs');

//LN-compares passwords
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// function loginRedirect(req, res, next) {
//   if (req.user) return res.redirect('/user');
//   return next();
// }

// function loginRequired(req, res, next) {
//   if (!req.user) return res.redirect('/auth/login');
//   return next();
// }

module.exports = {
  comparePass,
  // loginRequired,
  // loginRedirect,
}

//referenced Class auth lesson https://git.generalassemb.ly/wdi-nyc-thundercats/LECTURE_U02_D09_Express-Auth
//referenced Git Group project for auth backend https://git.generalassemb.ly/wdi-nyc-thundercats/PROJECT_03-Team-Build-Practice/blob/master/phase-2/1-auth-backend.md

